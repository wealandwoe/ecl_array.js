var Utils = {};
(function() {

var CHARS = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

var rand_text = function(len, chars) {
	if(!chars){chars=CHARS;}
	var i,result,charlen=chars.length;
	result = "";
	for(i=0; i<len; i++) {
		result += chars.charAt(rand(charlen));
	}
	return result;
};

var rand = function(max) {
	return Math.floor(Math.random() * max);
};

var Timer = function() {
	var date,msec;
	date = new Date();
	return {
		start : function() {
			this.date = new Date();
		},
		
		stop : function() {
			this.msec = (new Date()).getTime() - this.date.getTime();
		},
		
		getTime : function() {
			return this.msec;
		}
	};
};

/**
 * ByteArray Object
 * convert Text,Hex,Base64,Base85,Ascii85 and CryptoJS.lib.WordArray to ByteArray.
 * @example
 *   ByteArray.fromText("abc");           // => [97, 99, 99]
 *   ByteArray.toText([97,98,99,100]);    // => "abcd"
 *   ByteArray.fromText("xyz", "Base64"); // => "eHl6"
 */
var _createBaseNmap = function(chars) {
	var i, il=chars.length, chr, table = {"index": {}};
	for(i=0; i<il; i++) {
		chr = chars.charAt(i);
		table[chr] = i;
		table.index[i] = chr;
	}
	return table;
};
/* RFC1924 http://tools.ietf.org/html/rfc1924  */
var _createBase85mapRfc1924 = function() {
	return _createBaseNmap("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~");
};
/* Adobe ASCII85 http://en.wikipedia.org/wiki/Ascii85 http://www.adobe.com/products/postscript/pdfs/PLRM.pdf */
var _createBase85mapAdobeAscii85 = function() {
	return _createBaseNmap("!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu");
};
var ByteArray = {
	b64map : (function() {
		return _createBaseNmap('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
	}()),
	b85map : (_createBase85mapRfc1924()),
	a85map : (_createBase85mapAdobeAscii85()),
	fromWordArray : function(wordarray, to) {
		var words = wordarray.words;
		var sigBytes = wordarray.sigBytes;
		// Convert
		var array = [];
		for (var i = 0; i < sigBytes; i++) {
			array.push( (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff );
		}
		if (to) {
			return ByteArray["to"+to](array);
		}
		return array;
	},
	toWordArray : function(bytearray, opt) {
		var words=[],i,il=bytearray.length,len=(opt||{}).bytes;
		if (!len) {len = il;}
		for(i=0; i<il; i++) {
			words[i >>> 2] |= bytearray[i] << (24 - (i % 4) * 8);
		}
		return CryptoJS.lib.WordArray.create(words, len);
	},
	fromBase64 : function(base64str, to) {
		var array=[],i,j,il=base64str.length,tmp=[0,0,0,0],len=0,idx,map=ByteArray.b64map,three=[];
		for(i=0; i<il; i++) {
			idx = map[base64str.charAt(i)];
			if (idx>=64 || idx<0) {
				i=il;
			} else {
				tmp[len++] = idx;
			}
			if (len===4 || i>=il-1) {
				three[0] = (tmp[0]<<2) | (tmp[1]>>>4);
				three[1] = ((tmp[1] & 0x0f)<<4) | (tmp[2]>>>2);
				three[2] = ((tmp[2] & 0x03)<<6) | tmp[3];
				for(j=0; j<len-1; j++) {
					array.push(three[j]);
				}
				tmp = [0,0,0,0];
				len = 0;
			}
		}
		if (to) {
			return ByteArray["to"+to](array);
		}
		return array;
	},
	toBase64 : function(bytearray) {
		var buf="", i=0, il=bytearray.length, tmp=[], len=0, map=ByteArray.b64map, four=[];
		for(i=0; i<il; i++) {
			tmp[len++] = bytearray[i];
			if (len===3 || i>=il-1) {
				four[0] = tmp[0]>>>2;
				four[1] = (tmp[0] & 0x03)<<4 | (tmp[1]>>>4);
				four[2] = (len<2) ? 64 : (((tmp[1] & 0x0f)<<2) | (tmp[2]>>>6));
				four[3] = (len<3) ? 64 : (tmp[2] & 0x3f);
				buf += map.index[four[0]] + map.index[four[1]] + map.index[four[2]] + map.index[four[3]];
				tmp = [];
				len = 0;
			}
		}
		return buf;
	},
	fromBase85 : function(base85str, to, opt) {
		var array=[],i,j,il=base85str.length,tmp=[84,84,84,84,84],len=0,idx,map=(opt||{}).map,
				bytes, //a, radix32 = [16777216, 65536, 256, 1],
				radix85 = [52200625, 614125, 7225, 85, 1];
		if (!map) {map = ByteArray.b85map;}
		for(i=0; i<il; i++) {
			idx = map[base85str.charAt(i)];
			if (idx>=85 || idx<0) {
				i=il;
			} else {
				tmp[len++] = idx;
			}
			if (len===5 || i>=il-1) {
				bytes = tmp[0]*radix85[0] + tmp[1]*radix85[1] + tmp[2]*radix85[2] + tmp[3]*radix85[3] + tmp[4];
				for(j=0; j<len-1; j++) {
					/*
					a = Math.floor(bytes/radix32[j]);
					array.push(a);
					bytes = bytes % radix32[j];
					*/
					array.push( (bytes >>> (24-j*8)) & 0xff );
				}
				tmp = [84,84,84,84,84];
				len = 0;
			}
		}
		if (to) {
			return ByteArray["to"+to](array);
		}
		return array;
	},
	toBase85 : function(bytearray, opt) {
		var buf="", i=0, j, il=bytearray.length, tmp=[], len=0, map=(opt||{}).map,
				 bytes, a, radix85 = [52200625, 614125, 7225, 85, 1],
				 radix32 = [16777216, 65536, 256, 1];
		if (!map) {map = ByteArray.b85map;}
		for(i=0; i<il; i++) {
			tmp[len++] = bytearray[i];
			if (len===4 || i>=il-1) {
				bytes = 0;
				for(j=0;j<len;j++) {
					bytes += tmp[j] * radix32[j];
				}
				for(j=0; j<len+1; j++) {
					a = Math.floor(bytes/radix85[j]);
					buf += map.index[a];
					bytes = bytes % radix85[j];
				}
				tmp = [];
				len = 0;
			}
		}
		return buf;
	},
	fromAscii85 : function(ascii85str, to) {
		ascii85str = ascii85str.replace(/\s/g,'').replace(/^<~/,'').replace(/~>$/,'').replace(/z/g, '!!!!!').replace(/y/g, '+<VdL');
		return ByteArray.fromBase85(ascii85str, to, {"map":ByteArray.a85map});
	},
	toAscii85 : function(bytearray) {
		var a85str = ByteArray.toBase85(bytearray, {"map":ByteArray.a85map}),i,il=a85str.length,grp="",tmp=[],len=0,buf="";
		for(i=0; i<il; i++) {
			tmp[len++] = a85str.charAt(i);
			if (len===5 || i>=il-1) {
				grp = tmp.join("");
				if (grp==='!!!!!') {grp='z';} // z : all-zero group ("0x00000000")
				if (grp==='+<VdL') {grp='y';} // y : all-space group ("0x20202020")
				buf += grp;
				tmp = [];
				len = 0;
			}
		}
		return "<~"+buf+"~>";
	},
	fromHex : function(hexStr, to) {
		var array=[],i=0,il=hexStr.length;
		for (i=0; i<il; i+=2) {
			array.push(parseInt(hexStr.substring(i, i+2), 16));
		}
		if (to) {
			return ByteArray["to"+to](array);
		}
		return array;
	},
	toHex : function(bytearray) {
		var str="",i=0,il=bytearray.length;
		for (i=0; i<il; i++) {
			str += (bytearray[i]<0x10 ? '0' : '') + bytearray[i].toString(16);
		}
		return str;
	},
	fromAscii : function(str, to) {
		var array=[], i, il=str.length;
		for(i=0; i<il; i++) {
			array.push( (str.charCodeAt(i) >>> 0) & 0xff );
		}
		if (to) {
			return ByteArray["to"+to](array);
		}
		return array;
	},
	toAscii : function(bytearray) {
		var str="", i, il=bytearray.length;
		for(i=0; i<il; i++) {
			str += String.fromCharCode(bytearray[i]);
		}
		return str;
	},
	fromText : function(str, to) {
		var array = ByteArray.fromAscii(unescape(encodeURIComponent(str)));
		if (to) {
			return ByteArray["to"+to](array);
		}
		return array;
	},
	toText : function(bytearray) {
		return decodeURIComponent(escape(ByteArray.toAscii(bytearray)));
	},
	fromByteArray : function(array, to) {
		if (to) {
			return ByteArray["to"+to](array);
		}
		return array;
	},
	toByteArray : function(array) {
		return array;
	}
};

/**
 * create_bytea : to create byte array function
 *   this object includes simple ByteArray.
 * 
 * @example
 *   var bytea = create_bytea({"Hex": "0d0a"}); // => {"ByteArray": [13, 10], "Hex": "0d0a", ...}
 *   // convert to CryptoJS.lib.WordArray Object
 *   bytea.toWordArray(); // => [Object]
 *   // convert to plain text
 *   bytea.toString();         // => "\r\n"
 *   // conver to Base64
 *   bytea.toString("Base64"); // => "DQo="
 *   // shortcut
 *   bytea.to_s();       // => "\r\n"
 *   bytea.to_s("a85");  // => "<~%13~>"
 *   // convert with CryptoJS.enc.*.stringify
 *   bytea.toString(CryptoJS.enc.Base64); // => "DQo="
 *   bytea.toString(CryptoJS.enc.Utf8);   // => "\r\n"
 */
var create_bytea = function(spec) {
	var that = {};
	var methods = ["Hex", "Base64", "Ascii", "Text", "WordArray", "ByteArray"],
			aliases = [
				['Hex', "hex"],
				['Base64', "base64", "b64"],
				['Base85', "base85", "b85", "RFC1924", "rfc1924"],
				['Ascii85', "ascii85", "a85"],
				['Ascii', "ascii", "Latin1", "latin1"],
				['Text', "text", "txt", "Utf8", "utf8"],
				['WordArray', "words", "word_array"],
				['ByteArray', "array", "bytea"]
			], amap = {},
			i, j, mlen = methods.length, key, val,
			array = spec.ByteArray || spec.array,
			words = spec.WordArray || spec.words,
			sigBytes;
	for(i=0; i<aliases.length; i++) {
		for(j=0; j<aliases[i].length; j++) {
			amap[aliases[i][j]] = aliases[i][0];
		}
	}
	for(j in spec) {
		key = j;
		val = spec[j];
		if (amap[key]) {break;}
	}
	if (val) {
		that[amap[key]] = val;
		array = ByteArray["from"+amap[key]](val);
		that.toByteArray = function(){return array;};
		sigBytes = array.length;
		if (amap[key]==='WordArray') {
			sigBytes = val.sigBytes;
		}
		that.bytes = sigBytes;
		if (!that.ByteArray) {
			that.ByteArray = that.array = array;
		}
		that.toWordArray = that.WordArray ? function(){
			return that.WordArray;
		} : function() {
			return ByteArray.toWordArray(array, {"bytes":sigBytes});
		};
	}
	
	that.toString = function(key) {
		if (typeof key === 'object' && key.stringify) { //CryptoJS.enc.*.stringify(words)
			if (!that.words) {
				that.WordArray = that.words = that.toWordArray();
			}
			return key.stringify(that.words);
		}
		key = amap[key];
		if (!key) {key = "Text";}
		var value = that[key] ? that[key] : ByteArray["to"+key](array, {"bytes":sigBytes});
		return value;
	};
	that.to_s = that.toString;
	
	return that;
};
Utils.rand_text = rand_text;
Utils.Timer = Timer;
Utils.ByteArray = ByteArray;
Utils.bytea = create_bytea;

})();
