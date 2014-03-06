/**
 * Utils.CRC32
 * @example
 *   var data = [0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21]; // "HelloWorld!"
 *   Utils.CRC32.calc(data) //=> -1211809465
 *   Utils.CRC32.hexstring("HelloWorld!") //=> "b7c54147"
 *   
 * @see http://ja.wikipedia.org/wiki/%E5%B7%A1%E5%9B%9E%E5%86%97%E9%95%B7%E6%A4%9C%E6%9F%BB
*/
this["Utils"]===undefined && (this.Utils={});
Utils.CRC32 = {};
(function(){
var crc_table = [];
 
(function() {
	var i,j,c,x=0xEDB88320;
	for (i=0;i<256;i++) {
		c=i;
		for (j=0;j<8;j++) {
			c = (c&1) ? (x^(c>>>1)) : (c>>>1);
		}
		crc_table[i] = c;
	}
})();
 
var update_crc32 = function(crc, octet) {
	return crc_table[(crc ^ octet) & 0xFF] ^ (crc >>> 8);
};
var crc32 = function(array) {
	var i,c=0xFFFFFFFF,len=array.length;
	for (i=0;i<len;i++) {
		c = update_crc32(c, array[i]);
	}
	return c^0xFFFFFFFF;
};
var hexstring = function(str) {
	var i,il=str.length,c,a,b,out="";
	c=0xFFFFFFFF;
	for(i=0;i<il;i++){
		a=str.charCodeAt(i),b=-1;
		a>255 && (b=a&255,a=a>>>8);
		c = update_crc32(c, a);
		b>=0 && (c = update_crc32(c, b));
	}
	c=c^0xFFFFFFFF;
	for(i=0;i<4;i++){
		a=(c>>>(24-i*8))&255;
		out += (a<16?'0':'')+a.toString(16);
	}
	return out;
};
Utils.CRC32.calc = crc32;
Utils.CRC32.hexstring = hexstring;

})();
