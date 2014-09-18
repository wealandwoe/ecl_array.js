"use strict";
var ECL = {};
(function() {
//
// Escape Codec Library: ecl.js (Ver.041208)
//
// Copyright (C) http://nurucom-archives.hp.infoseek.co.jp/digital/
//
/*
EscapeSJIS=function(str){
	return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
		var c=s.charCodeAt(0),m;
		return c<128?(c<16?"%0":"%")+c.toString(16).toUpperCase():65376<c&&c<65440?"%"+(c-65216).toString(16).toUpperCase():(c=JCT11280.indexOf(s))<0?"%81E":"%"+((m=((c<8272?c:(c=JCT11280.lastIndexOf(s)))-(c%=188))/188)<31?m+129:m+193).toString(16).toUpperCase()+(64<(c+=c<63?64:65)&&c<91||95==c||96<c&&c<123?String.fromCharCode(c):"%"+c.toString(16).toUpperCase())
	})
};

UnescapeSJIS=function(str){
	return str.replace(/%(8[1-9A-F]|[9E][0-9A-F]|F[0-9A-C])(%[4-689A-F][0-9A-F]|%7[0-9A-E]|[@-~])|%([0-7][0-9A-F]|A[1-9A-F]|[B-D][0-9A-F])/ig,function(s){
		var c=parseInt(s.substring(1,3),16),l=s.length;
		return 3==l?String.fromCharCode(c<160?c:c+65216):JCT11280.charAt((c<160?c-129:c-193)*188+(4==l?s.charCodeAt(3)-64:(c=parseInt(s.substring(4),16))<127?c-64:c-65))
	})
};

EscapeEUCJP=function(str){
	return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
		var c=s.charCodeAt(0);
		return (c<128?(c<16?"%0":"%")+c.toString(16):65376<c&&c<65440?"%8E%"+(c-65216).toString(16):(c=JCT8836.indexOf(s))<0?"%A1%A6":"%"+((c-(c%=94))/94+161).toString(16)+"%"+(c+161).toString(16)).toUpperCase()
	})
};

UnescapeEUCJP=function(str){
	return str.replace(/(%A[1-9A-F]|%[B-E][0-9A-F]|%F[0-9A-E]){2}|%8E%(A[1-9A-F]|[B-D][0-9A-F])|%[0-7][0-9A-F]/ig,function(s){
		var c=parseInt(s.substring(1),16);
		return c<161?String.fromCharCode(c<128?c:parseInt(s.substring(4),16)+65216):JCT8836.charAt((c-161)*94+parseInt(s.substring(4),16)-161)
	})
};

EscapeJIS7=function(str){
	var u=String.fromCharCode,ri=u(92,120,48,48,45,92,120,55,70),rj=u(65377,45,65439,93,43),
	H=function(c){
		return 41<c&&c<58&&44!=c||64<c&&c<91||95==c||96<c&&c<123?u(c):"%"+c.toString(16).toUpperCase()
	},
	I=function(s){
		var c=s.charCodeAt(0);
		return (c<16?"%0":"%")+c.toString(16).toUpperCase()
	},
	rI=new RegExp;rI.compile("[^*+.-9A-Z_a-z-]","g");
	return ("g"+str+"g").replace(RegExp("["+ri+"]+","g"),function(s){
		return "%1B%28B"+s.replace(rI,I)
	}).replace(RegExp("["+rj,"g"),function(s){
		var c,i=0,t="%1B%28I";while(c=s.charCodeAt(i++))t+=H(c-65344);return t
	}).replace(RegExp("[^"+ri+rj,"g"),function(s){
		var a,c,i=0,t="%1B%24B";while(a=s.charAt(i++))t+=(c=JCT8836.indexOf(a))<0?"%21%26":H((c-(c%=94))/94+33)+H(c+33);return t
	}).slice(8,-1)
};

UnescapeJIS7=function(str){
	var i=0,p,q,s="",u=String.fromCharCode,
	P=("%28B"+str.replace(/%49/g,"I").replace(/%1B%24%4[02]|%1B%24@/ig,"%1B%24B")).split(/%1B/i),
	I=function(s){
		return u(parseInt(s.substring(1),16))
	},
	J=function(s){
		return u((3==s.length?parseInt(s.substring(1),16):s.charCodeAt(0))+65344)
	},
	K=function(s){
		var l=s.length;
		return JCT8836.charAt(4<l?(parseInt(s.substring(1),16)-33)*94+parseInt(s.substring(4),16)-33:2<l?(37==(l=s.charCodeAt(0))?(parseInt(s.substring(1,3),16)-33)*94+s.charCodeAt(3):(l-33)*94+parseInt(s.substring(2),16))-33:(s.charCodeAt(0)-33)*94+s.charCodeAt(1)-33)
	},
	rI=new RegExp,rJ=new RegExp,rK=new RegExp;
	rI.compile("%[0-7][0-9A-F]","ig");rJ.compile("(%2[1-9A-F]|%[3-5][0-9A-F])|[!-_]","ig");
	rK.compile("(%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E]){2}|(%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E])[!-~]|[!-~](%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E])|[!-~]{2}","ig");
	while(p=P[i++])s+="%24B"==(q=p.substring(0,4))?p.substring(4).replace(rK,K):"%28I"==q?p.substring(4).replace(rJ,J):p.replace(rI,I).substring(2);
	return s
};

EscapeJIS8=function(str){
	var u=String.fromCharCode,r=u(92,120,48,48,45,92,120,55,70,65377,45,65439,93,43),
	H=function(c){
		return 41<c&&c<58&&44!=c||64<c&&c<91||95==c||96<c&&c<123?u(c):"%"+c.toString(16).toUpperCase()
	},
	I=function(s){
		var c=s.charCodeAt(0);
		return (c<16?"%0":"%")+(c<128?c:c-65216).toString(16).toUpperCase()
	},
	rI=new RegExp;rI.compile("[^*+.-9A-Z_a-z-]","g");
	return ("g"+str+"g").replace(RegExp("["+r,"g"),function(s){
		return "%1B%28B"+s.replace(rI,I)
	}).replace(RegExp("[^"+r,"g"),function(s){
		var a,c,i=0,t="%1B%24B";while(a=s.charAt(i++))t+=(c=JCT8836.indexOf(a))<0?"%21%26":H((c-(c%=94))/94+33)+H(c+33);return t
	}).slice(8,-1)
};

UnescapeJIS8=function(str){
	var i=0,p,s="",
	P=("%28B"+str.replace(/%1B%24%4[02]|%1B%24@/ig,"%1B%24B")).split(/%1B/i),
	I=function(s){
		var c=parseInt(s.substring(1),16);
		return String.fromCharCode(c<128?c:c+65216)
	},
	K=function(s){
		var l=s.length;
		return JCT8836.charAt(4<l?(parseInt(s.substring(1),16)-33)*94+parseInt(s.substring(4),16)-33:2<l?(37==(l=s.charCodeAt(0))?(parseInt(s.substring(1,3),16)-33)*94+s.charCodeAt(3):(l-33)*94+parseInt(s.substring(2),16))-33:(s.charCodeAt(0)-33)*94+s.charCodeAt(1)-33)
	},
	rI=new RegExp,rK=new RegExp;
	rI.compile("%([0-7][0-9A-F]|A[1-9A-F]|[B-D][0-9A-F])","ig");
	rK.compile("(%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E]){2}|(%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E])[!-~]|[!-~](%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E])|[!-~]{2}","ig");
	while(p=P[i++])s+="%24B"==p.substring(0,4)?p.substring(4).replace(rK,K):p.replace(rI,I).substring(2);
	return s
};

EscapeUnicode=function(str){
	return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
		var c=s.charCodeAt(0);
		return (c<16?"%0":c<256?"%":c<4096?"%u0":"%u")+c.toString(16).toUpperCase()
	})
};

UnescapeUnicode=function(str){
	return str.replace(/%u[0-9A-F]{4}|%[0-9A-F]{2}/ig,function(s){
		return String.fromCharCode("0x"+s.substring(s.length/3))
	})
};

EscapeUTF7=function(str){
	var B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
	E=function(s){
		var c=s.charCodeAt(0);
		return B[c>>10]+B[c>>4&63]+B[(c&15)<<2|(c=s.charCodeAt(1))>>14]+(0<=c?B[c>>8&63]+B[c>>2&63]+B[(c&3)<<4|(c=s.charCodeAt(2))>>12]+(0<=c?B[c>>6&63]+B[c&63]:""):"")
	},
	re=new RegExp;re.compile("[^+]{1,3}","g");
	return (str+"g").replace(/[^*+.-9A-Z_a-z-]+[*+.-9A-Z_a-z-]|[+]/g,function(s){
		if("+"==s)return "+-";
		var l=s.length-1,w=s.charAt(l);
		return "+"+s.substring(0,l).replace(re,E)+("+"==w?"-+-":"*"==w||"."==w||"_"==w?w:"-"+w)
	}).slice(0,-1)
};

UnescapeUTF7=function(str){
	var i=0,B={};
	while(i<64)B["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i)]=i++;
	return str.replace(RegExp("[+][+/-9A-Za-z]*-?","g"),function(s){
		if("+-"==s)return "+";
		var b=B[s.charAt(1)],c,i=1,t="";
		while(0<=b){
			if((c=i&7)<6)c=c<3?b<<10|B[s.charAt(++i)]<<4|(b=B[s.charAt(++i)])>>2:(b&3)<<14|B[s.charAt(++i)]<<8|B[s.charAt(++i)]<<2|(b=B[s.charAt(++i)])>>4;
			else{c=(b&15)<<12|B[s.charAt(++i)]<<6|B[s.charAt(++i)];b=B[s.charAt(++i)]}
			if(c)t+=String.fromCharCode(c)
		}
		return t
	})
};

EscapeUTF8=function(str){
	return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
		var c=s.charCodeAt(0);
		return (c<16?"%0"+c.toString(16):c<128?"%"+c.toString(16):c<2048?"%"+(c>>6|192).toString(16)+"%"+(c&63|128).toString(16):"%"+(c>>12|224).toString(16)+"%"+(c>>6&63|128).toString(16)+"%"+(c&63|128).toString(16)).toUpperCase()
	})
};

UnescapeUTF8=function(str){
	return str.replace(/%(E(0%[AB]|[1-CEF]%[89AB]|D%[89])[0-9A-F]|C[2-9A-F]|D[0-9A-F])%[89AB][0-9A-F]|%[0-7][0-9A-F]/ig,function(s){
		var c=parseInt(s.substring(1),16);
		return String.fromCharCode(c<128?c:c<224?(c&31)<<6|parseInt(s.substring(4),16)&63:((c&15)<<6|parseInt(s.substring(4),16)&63)<<6|parseInt(s.substring(7),16)&63)
	})
};

EscapeUTF16LE=function(str){
	var H=function(c){
		return 41<c&&c<58&&44!=c||64<c&&c<91||95==c||96<c&&c<123?String.fromCharCode(c):(c<16?"%0":"%")+c.toString(16).toUpperCase()
	};
	return str.replace(/[^ ]| /g,function(s){
		var c=s.charCodeAt(0);return H(c&255)+H(c>>8)
	})
};

UnescapeUTF16LE=function(str){
	var u=String.fromCharCode,b=u(92,120,48,48,45,92,120,70,70);
	return str.replace(/^%FF%FE/i,"").replace(RegExp("%[0-9A-F]{2}%[0-9A-F]{2}|%[0-9A-F]{2}["+b+"]|["+b+"]%[0-9A-F]{2}|["+b+"]{2}","ig"),function(s){
		var l=s.length;
		return u(4<l?"0x"+s.substring(4,6)+s.substring(1,3):2<l?37==(l=s.charCodeAt(0))?parseInt(s.substring(1,3),16)|s.charCodeAt(3)<<8:l|parseInt(s.substring(2),16)<<8:s.charCodeAt(0)|s.charCodeAt(1)<<8)
	})
};
*/

var GetEscapeCodeType=function(str){
	if(/%u[0-9A-F]{4}/i.test(str))return "Unicode";
	if(/%([0-9A-DF][0-9A-F]%[8A]0%|E0%80|[0-7][0-9A-F]|C[01])%[8A]0|%00|%[7F]F/i.test(str))return "UTF16LE";
	if(/%E[0-9A-F]%[8A]0%[8A]0|%[CD][0-9A-F]%[8A]0/i.test(str))return "UTF8";
	if(/%F[DE]/i.test(str))return /%8[0-9A-D]|%9[0-9A-F]|%A0/i.test(str)?"UTF16LE":"EUCJP";
	if(/%1B/i.test(str))return /%[A-D][0-9A-F]/i.test(str)?"JIS8":"JIS7";
	var S=str.substring(0,6143).replace(/%[0-9A-F]{2}|[^ ]| /ig,function(s){
		return s.length<3?"40":s.substring(1)
	}),c,C,i=0,T;
	while(0<=(c=parseInt(S.substring(i,i+=2),16))&&i<4092)if(128<=c){
		if((C=parseInt(S.substring(i,i+2),16))<128)i+=2;
		else if(194<=c&&c<240&&C<192){
			if(c<224){T="UTF8";i+=2;continue}
			if(2==parseInt(S.charAt(i+2),16)>>2){T="UTF8";i+=4;continue}
		}
		if(142==c&&161<=C&&C<224){if(!T)T="EUCJP";if("EUCJP"==T)continue}
		if(c<161)return "SJIS";
		if(c<224&&!T)
			if((164==c&&C<244||165==c&&C<247)&&161<=C)i+=2;
			else T=224<=C?"EUCJP":"SJIS";
		else T="EUCJP"
	}
	return T?T:"EUCJP"
};
var JISX0208=Function(
'var a="zKV33~jZ4zN=~ji36XazM93y!{~k2y!o~k0ZlW6zN?3Wz3W?{EKzK[33[`y|;-~j^YOTz$!~kNy|L1$353~jV3zKk3~k-4P4zK_2+~jY4y!xYHR~jlz$_~jk4z$e3X5He<0y!wy|X3[:~l|VU[F3VZ056Hy!nz/m1XD61+1XY1E1=1y|bzKiz!H034zKj~mEz#c5ZA3-3X$1~mBz$$3~lyz#,4YN5~mEz#{ZKZ3V%7Y}!J3X-YEX_J(3~mAz =V;kE0/y|F3y!}~m>z/U~mI~j_2+~mA~jp2;~m@~k32;~m>V}2u~mEX#2x~mBy+x2242(~mBy,;2242(~may->2&XkG2;~mIy-_2&NXd2;~mGz,{4<6:.:B*B:XC4>6:.>B*BBXSA+A:X]E&E<~r#z+625z s2+zN=`HXI@YMXIAXZYUM8X4K/:Q!Z&33 3YWX[~mB`{zKt4z (zV/z 3zRw2%Wd39]S11z$PAXH5Xb;ZQWU1ZgWP%3~o@{Dgl#gd}T){Uo{y5_d{e@}C(} WU9|cB{w}bzvV|)[} H|zT}d||0~{]Q|(l{|x{iv{dw}(5}[Z|kuZ }cq{{y|ij}.I{idbof%cu^d}Rj^y|-M{ESYGYfYsZslS`?ZdYO__gLYRZ&fvb4oKfhSf^d<Yeasc1f&a=hnYG{QY{D`Bsa|u,}Dl|_Q{C%xK|Aq}C>|c#ryW=}eY{L+`)][YF_Ub^h4}[X|?r|u_ex}TL@YR]j{SrXgo*|Gv|rK}B#mu{R1}hs|dP{C7|^Qt3|@P{YVV |8&}#D}ef{e/{Rl|>Hni}R1{Z#{D[}CQlQ||E}[s{SG_+i8eplY[=[|ec[$YXn#`hcm}YR|{Ci(_[ql|?8p3]-}^t{wy}4la&pc|3e{Rp{LqiJ],] `kc(]@chYnrM`O^,ZLYhZB]ywyfGY~aex!_Qww{a!|)*lHrM{N+n&YYj~Z b c#e_[hZSon|rOt`}hBXa^i{lh|<0||r{KJ{kni)|x,|0auY{D!^Sce{w;|@S|cA}Xn{C1h${E]Z-XgZ*XPbp]^_qbH^e[`YM|a||+=]!Lc}]vdBc=j-YSZD]YmyYLYKZ9Z>Xcczc2{Yh}9Fc#Z.l{}(D{G{{mRhC|L3b#|xK[Bepj#ut`H[,{E9Yr}1b{[e]{ZFk7[ZYbZ0XL]}Ye[(`d}c!|*y`Dg=b;gR]Hm=hJho}R-[n}9;{N![7k_{UbmN]rf#pTe[x8}!Qcs_rs[m`|>N}^V})7{^r|/E}),}HH{OYe2{Skx)e<_.cj.cjoMhc^d}0uYZd!^J_@g,[[[?{i@][|3S}Yl3|!1|eZ|5IYw|1D}e7|Cv{OHbnx-`wvb[6[4} =g+k:{C:}ed{S]|2M]-}WZ|/q{LF|dYu^}Gs^c{Z=}h>|/i|{W]:|ip{N:|zt|S<{DH[p_tvD{N<[8Axo{X4a.^o^X>Yfa59`#ZBYgY~_t^9`jZHZn`>G[oajZ;X,i)Z.^~YJe ZiZF^{][[#Zt^|]Fjx]&_5dddW]P0C[-]}]d|y {C_jUql] |OpaA[Z{lp|rz}:Mu#]_Yf6{Ep?f5`$[6^D][^u[$[6^.Z8]]ePc2U/=]K^_+^M{q*|9tYuZ,s(dS{i=|bNbB{uG}0jZOa:[-]dYtu3]:]<{DJ_SZIqr_`l=Yt`gkTnXb3d@kiq0a`Z{|!B|}e}Ww{Sp,^Z|0>_Z}36|]A|-t}lt{R6pi|v8hPu#{C>YOZHYmg/Z4nicK[}hF_Bg|YRZ7c|crkzYZY}_iXcZ.|)U|L5{R~qi^Uga@Y[xb}&qdbd6h5|Btw[}c<{Ds53[Y7]?Z<|e0{L[ZK]mXKZ#Z2^tavf0`PE[OSOaP`4gi`qjdYMgys/?[nc,}EEb,eL]g[n{E_b/vcvgb.{kcwi`~v%|0:|iK{Jh_vf5lb}KL|(oi=LrzhhY_^@`zgf[~g)[J_0fk_V{T)}I_{D&_/d9W/|MU[)f$xW}?$xr4<{Lb{y4}&u{XJ|cm{Iu{jQ}CMkD{CX|7A}G~{kt)nB|d5|<-}WJ}@||d@|Iy}Ts|iL|/^|no|0;}L6{Pm]7}$zf:|r2}?C_k{R(}-w|`G{Gy[g]bVje=_0|PT{^Y^yjtT[[[l!Ye_`ZN]@[n_)j3nEgMa]YtYpZy].d-Y_cjb~Y~[nc~sCi3|zg}B0}do{O^{|$`_|D{}U&|0+{J3|8*]iayx{a{xJ_9|,c{Ee]QXlYb]$[%YMc*]w[aafe]aVYi[fZEii[xq2YQZHg]Y~h#|Y:thre^@^|_F^CbTbG_1^qf7{L-`VFx Zr|@EZ;gkZ@slgko`[e}T:{Cu^pddZ_`yav^Ea+[#ZBbSbO`elQfLui}.F|txYcbQ`XehcGe~fc^RlV{D_0ZAej[l&jShxG[ipB_=u:eU}3e8[=j|{D(}dO{Do[BYUZ0/]AYE]ALYhZcYlYP/^-^{Yt_1_-;YT`P4BZG=IOZ&]H[e]YYd[9^F[1YdZxZ?Z{Z<]Ba2[5Yb[0Z4l?]d_;_)a?YGEYiYv`_XmZs4ZjY^Zb]6gqGaX^9Y}dXZr[g|]Y}K aFZp^k^F]M`^{O1Ys]ZCgCv4|E>}8eb7}l`{L5[Z_faQ|c2}Fj}hw^#|Ng|B||w2|Sh{v+[G}aB|MY}A{|8o}X~{E8paZ:]i^Njq]new)`-Z>haounWhN}c#{DfZ|fK]KqGZ=:u|fqoqcv}2ssm}.r{]{nIfV{JW)[K|,Z{Uxc|]l_KdCb%]cfobya3`p}G^|LZiSC]U|(X|kBlVg[kNo({O:g:|-N|qT}9?{MBiL}Sq{`P|3a|u.{Uaq:{_o|^S}jX{Fob0`;|#y_@[V[K|cw[<_ }KU|0F}d3|et{Q7{LuZttsmf^kYZ`Af`}$x}U`|Ww}d]| >}K,r&|XI|*e{C/a-bmr1fId4[;b>tQ_:]hk{b-pMge]gfpo.|(w[jgV{EC1Z,YhaY^q,_G[c_g[J0YX]`[h^hYK^_Yib,` {i6vf@YM^hdOKZZn(jgZ>bzSDc^Z%[[o9[2=/YHZ(_/Gu_`*|8z{DUZxYt^vuvZjhi^lc&gUd4|<UiA`z]$b/Z?l}YI^jaHxe|;F}l${sQ}5g}hA|e4}?o{ih}Uz{C)jPe4]H^J[Eg[|AMZMlc}:,{iz}#*|gc{Iq|/:|zK{l&}#u|myd{{M&v~nV};L|(g|I]ogddb0xsd7^V})$uQ{HzazsgxtsO^l}F>ZB]r|{7{j@cU^{{CbiYoHlng]f+nQ[bkTn/}<-d9q {KXadZYo+n|l[|lc}V2{[a{S4Zam~Za^`{HH{xx_SvF|ak=c^[v^7_rYT`ld@]:_ub%[$[m](Shu}G2{E.ZU_L_R{tz`vj(f?^}hswz}GdZ}{S:h`aD|?W|`dgG|if{a8|J1{N,}-Ao3{H#{mfsP|[ bzn+}_Q{MT{u4kHcj_q`eZj[8o0jy{p7}C|[}l){MuYY{|Ff!Ykn3{rT|m,^R|,R}$~Ykgx{P!]>iXh6[l[/}Jgcg{JYZ.^qYfYIZl[gZ#Xj[Pc7YyZD^+Yt;4;`e8YyZVbQ7YzZxXja.7SYl[s]2^/Ha$[6ZGYrb%XiYdf2]H]kZkZ*ZQ[ZYS^HZXcCc%Z|[(bVZ]]:OJQ_DZCg<[,]%Zaa [g{C00HY[c%[ChyZ,Z_`PbXa+eh`^&jPi0a[ggvhlekL]w{Yp^v}[e{~;k%a&k^|nR_z_Qng}[E}*Wq:{k^{FJZpXRhmh3^p>de^=_7`|ZbaAZtdhZ?n4ZL]u`9ZNc3g%[6b=e.ZVfC[ZZ^^^hD{E(9c(kyZ=bb|Sq{k`|vmr>izlH[u|e`}49}Y%}FT{[z{Rk}Bz{TCc/lMiAqkf(m$hDc;qooi[}^o:c^|Qm}a_{mrZ(pA`,}<2sY| adf_%|}`}Y5U;}/4|D>|$X{jw{C<|F.hK|*A{MRZ8Zsm?imZm_?brYWZrYx`yVZc3a@f?aK^ojEd {bN}/3ZH]/$YZhm^&j 9|(S|b]mF}UI{q&aM]LcrZ5^.|[j`T_V_Gak}9J[ ZCZD|^h{N9{~&[6Zd{}B}2O|cv]K}3s}Uy|l,fihW{EG`j_QOp~Z$F^zexS`dcISfhZBXP|.vn|_HYQ|)9|cr]<`&Z6]m_(ZhPcSg>`Z]5`~1`0Xcb4k1{O!bz|CN_T{LR|a/gFcD|j<{Z._[f)mPc:1`WtIaT1cgYkZOaVZOYFrEe[}T$}Ch}mk{K-^@]fH{Hdi`c*Z&|Kt{if[C{Q;{xYB`dYIX:ZB[}]*[{{p9|4GYRh2ao{DS|V+[zd$`F[ZXKadb*A] Ys]Maif~a/Z2bmclb8{Jro_rz|x9cHojbZ{GzZx_)]:{wAayeDlx}<=`g{H1{l#}9i|)=|lP{Qq}.({La|!Y{i2EZfp=c*}Cc{EDvVB|;g}2t{W4av^Bn=]ri,|y?|3+}T*ckZ*{Ffr5e%|sB{lx^0]eZb]9[SgAjS_D|uHZx]dive[c.YPkcq/}db{EQh&hQ|eg}G!ljil|BO]X{Qr_GkGl~YiYWu=c3eb}29v3|D|}4i||.{Mv})V{SP1{FX}CZW6{cm|vO{pS|e#}A~|1i}81|Mw}es|5[}3w{C`h9aL]o{}p[G`>i%a1Z@`Ln2bD[$_h`}ZOjhdTrH{[j_:k~kv[Sdu]CtL}41{I |[[{]Zp$]XjxjHt_eThoa#h>sSt8|gK|TVi[Y{t=}Bs|b7Zpr%{gt|Yo{CS[/{iteva|cf^hgn}($_c^wmb^Wm+|55jrbF|{9^ q6{C&c+ZKdJkq_xOYqZYSYXYl`8]-cxZAq/b%b*_Vsa[/Ybjac/OaGZ4fza|a)gY{P?| I|Y |,pi1n7}9bm9ad|=d{aV|2@[(}B`d&|Uz}B}{`q|/H|!JkM{FU|CB|.{}Az}#P|lk}K{|2rk7{^8^?`/|k>|Ka{Sq}Gz}io{DxZh[yK_#}9<{TRdgc]`~Z>JYmYJ]|`!ZKZ]gUcx|^E[rZCd`f9oQ[NcD_$ZlZ;Zr}mX|=!|$6ZPZYtIo%fj}CpcN|B,{VDw~gb}@hZg`Q{LcmA[(bo`<|@$|o1|Ss}9Z_}tC|G`{F/|9nd}i=}V-{L8aaeST]daRbujh^xlpq8|}zs4bj[S`J|]?G{P#{rD{]I`OlH{Hm]VYuSYUbRc*6[j`8]pZ[bt_/^Jc*[<Z?YE|Xb|?_Z^Vcas]h{t9|Uwd)_(=0^6Zb{Nc} E[qZAeX[a]P^|_J>e8`W^j_Y}R{{Jp__]Ee#e:iWb9q_wKbujrbR}CY`,{mJ}gz{Q^{t~N|? gSga`V_||:#mi}3t|/I`X{N*|ct|2g{km}gi|{={jC}F;|E}{ZZjYf*frmu}8Tdroi{T[|+~}HG{cJ}DM{Lp{Ctd&}$hi3|FZ| m}Kr|38}^c|m_|Tr{Qv|36}?Up>|;S{DV{k_as}BK{P}}9p|t`jR{sAm4{D=b4pWa[}Xi{EjwEkI}3S|E?u=X0{jf} S|NM|JC{qo^3cm]-|JUx/{Cj{s>{Crt[UXuv|D~|j|d{YXZR}Aq}0r}(_{pJfi_z}0b|-vi)Z mFe,{f4|q`b{}^Z{HM{rbeHZ|^x_o|XM|L%|uFXm}@C_{{Hhp%a7|0p[Xp+^K}9U{bP}: tT}B|}+$|b2|[^|~h{FAby[`{}xgygrt~h1[li`c4vz|,7p~b(|mviN}^pg[{N/|g3|^0c,gE|f%|7N{q[|tc|TKA{LU}I@|AZp(}G-sz{F |qZ{}F|f-}RGn6{Z]_5})B}UJ{FFb2]4ZI@v=k,]t_Dg5Bj]Z-]L]vrpdvdGlk|gF}G]|IW}Y0[G| /bo|Te^,_B}#n^^{QHYI[?hxg{[`]D^IYRYTb&kJ[cri[g_9]Ud~^_]<p@_e_XdNm-^/|5)|h_{J;{kacVopf!q;asqd}n)|.m|bf{QW|U)}b+{tL|w``N|to{t ZO|T]jF}CB|0Q{e5Zw|k |We}5:{HO{tPwf_uajjBfX}-V_C_{{r~gg|Ude;s+}KNXH}! `K}eW{Upwbk%ogaW}9EYN}YY|&v|SL{C3[5s.]Y]I]u{M6{pYZ`^,`ZbCYR[1mNg>rsk0Ym[jrE]RYiZTr*YJ{Ge|%-lf|y(`=[t}E6{k!|3)}Zk} ][G{E~cF{u3U.rJ|a9p#o#ZE|?|{sYc#vv{E=|LC}cu{N8`/`3`9rt[4|He{cq|iSYxY`}V |(Q|t4{C?]k_Vlvk)BZ^r<{CL}#h}R+[<|i=}X|{KAo]|W<`K{NW|Zx}#;|fe{IMr<|K~tJ_x}AyLZ?{GvbLnRgN}X&{H7|x~}Jm{]-| GpNu0}.ok>|c4{PYisrDZ|fwh9|hfo@{H~XSbO]Odv]%`N]b1Y]]|eIZ}_-ZA]aj,>eFn+j[aQ_+]h[J_m_g]%_wf.`%k1e#Z?{CvYu_B^|gk`Xfh^M3`afGZ-Z|[m{L}|k3cp[it ^>YUi~d>{T*}YJ{Q5{Jxa$hg|%4`}|LAgvb }G}{P=|<;Ux{_skR{cV|-*|s-{Mp|XP|$G|_J}c6cM{_=_D|*9^$ec{V;|4S{qO|w_|.7}d0|/D}e}|0G{Dq]Kdp{}dfDi>}B%{Gd|nl}lf{C-{y}|ANZr}#={T~|-(}c&{pI|ft{lsVP}){|@u}!W|bcmB{d?|iW|:dxj{PSkO|Hl]Li:}VYk@|2={fnWt{M3`cZ6|)}|Xj}BYa?vo{e4|L7|B7{L7|1W|lvYO}W8nJ|$Vih|{T{d*_1|:-n2dblk``fT{Ky|-%}m!|Xy|-a{Pz}[l{kFjz|iH}9N{WE{x,|jz}R {P|{D)c=nX|Kq|si}Ge{sh|[X{RF{t`|jsr*fYf,rK|/9}$}}Nf{y!1|<Std}4Wez{W${Fd_/^O[ooqaw_z[L`Nbv[;l7V[ii3_PeM}.h^viqYjZ*j1}+3{bt{DR[;UG}3Og,rS{JO{qw{d<_zbAh<R[1_r`iZTbv^^a}c{iEgQZ<exZFg.^Rb+`Uj{a+{z<[~r!]`[[|rZYR|?F|qppp]L|-d|}K}YZUM|=Y|ktm*}F]{D;g{uI|7kg^}%?Z%ca{N[_<q4xC]i|PqZC]n}.bDrnh0Wq{tr|OMn6tM|!6|T`{O`|>!]ji+]_bTeU}Tq|ds}n|{Gm{z,f)}&s{DPYJ`%{CGd5v4tvb*hUh~bf]z`jajiFqAii]bfy^U{Or|m+{I)cS|.9k:e3`^|xN}@Dnlis`B|Qo{`W|>||kA}Y}{ERYuYx`%[exd`]|OyiHtb}HofUYbFo![5|+]gD{NIZR|Go}.T{rh^4]S|C9_}xO^i`vfQ}C)bK{TL}cQ|79iu}9a];sj{P.o!f[Y]pM``Jda^Wc9ZarteBZClxtM{LW}l9|a.mU}KX}4@{I+f1}37|8u}9c|v${xGlz}jP{Dd1}e:}31}%3X$|22i<v+r@~mf{sN{C67G97855F4YL5}8f{DT|xy{sO{DXB334@55J1)4.G9A#JDYtXTYM4, YQD9;XbXm9SX]IB^4UN=Xn<5(;(F3YW@XkH-X_VM[DYM:5XP!T&Y`6|,^{IS-*D.H>:LXjYQ0I3XhAF:9:(==.F*3F1189K/7163D,:@|e2{LS36D4hq{Lw/84443@4.933:0307::6D7}&l{Mx657;89;,K5678H&93D(H<&<>0B90X^I;}Ag1{P%3A+>><975}[S{PZE453?4|T2{Q+5187;>447:81{C=hL6{Me^:=7ii{R=.=F<81;48?|h8}Uh{SE|,VxL{ST,7?9Y_5Xk3A#:$%YSYdXeKXOD8+TXh7(@>(YdXYHXl9J6X_5IXaL0N?3YK7Xh!1?XgYz9YEXhXaYPXhC3X`-YLY_XfVf[EGXZ5L8BXL9YHX]SYTXjLXdJ: YcXbQXg1PX]Yx4|Jr{Ys4.8YU+XIY`0N,<H%-H;:0@,74/:8546I=9177154870UC]d<C3HXl7ALYzXFXWP<<?E!88E5@03YYXJ?YJ@6YxX-YdXhYG|9o{`iXjY_>YVXe>AYFX[/(I@0841?):-B=14337:8=|14{c&93788|di{cW-0>0<097/A;N{FqYpugAFT%X/Yo3Yn,#=XlCYHYNX[Xk3YN:YRT4?)-YH%A5XlYF3C1=NWyY}>:74-C673<69545v {iT85YED=64=.F4..9878/D4378?48B3:7:7/1VX[f4{D,{l<5E75{dAbRB-8-@+;DBF/$ZfW8S<4YhXA.(5@*11YV8./S95C/0R-A4AXQYI7?68167B95HA1*<M3?1/@;/=54XbYP36}lc{qzSS38:19?,/39193574/66878Yw1X-87E6=;964X`T734:>86>1/=0;(I-1::7ALYGXhF+Xk[@W%TYbX7)KXdYEXi,H-XhYMRXfYK?XgXj.9HX_SX]YL1XmYJ>Y}WwIXiI-3-GXcYyXUYJ$X`Vs[7;XnYEZ;XF! 3;%8;PXX(N3Y[)Xi1YE&/ :;74YQ6X`33C;-(>Xm0(TYF/!YGXg8 9L5P01YPXO-5%C|qd{{/K/E6,=0144:361:955;6443@?B7*7:F89&F35YaX-CYf,XiFYRXE_e{}sF 0*7XRYPYfXa5YXXY8Xf8Y~XmA[9VjYj*#YMXIYOXk,HHX40YxYMXU8OXe;YFXLYuPXP?EB[QV0CXfY{:9XV[FWE0D6X^YVP*$4%OXiYQ(|xp|%c3{}V`1>Y`XH00:8/M6XhQ1:;3414|TE|&o@1*=81G8<3}6<|(f6>>>5-5:8;093B^3U*+*^*UT30XgYU&7*O1953)5@E78--F7YF*B&0:%P68W9Zn5974J9::3}Vk|-,C)=)1AJ4+<3YGXfY[XQXmT1M-XcYTYZXCYZXEYXXMYN,17>XIG*SaS|/eYJXbI?XdNZ+WRYP<F:R PXf;0Xg`$|1GX9YdXjLYxWX!ZIXGYaXNYm6X9YMX?9EXmZ&XZ#XQ>YeXRXfAY[4 ;0X!Zz0XdN$XhYL XIY^XGNXUYS/1YFXhYk.TXn4DXjB{jg|4DEX]:XcZMW=A.+QYL<LKXc[vV$+&PX*Z3XMYIXUQ:ZvW< YSXFZ,XBYeXMM)?Xa XiZ4/EXcP3%}&-|6~:1(-+YT$@XIYRBC<}&,|7aJ6}bp|8)K1|Xg|8C}[T|8Q.89;-964I38361<=/;883651467<7:>?1:.}le|:Z=39;1Y^)?:J=?XfLXbXi=Q0YVYOXaXiLXmJXO5?.SFXiCYW}-;|=u&D-X`N0X^,YzYRXO(QX_YW9`I|>hZ:N&X)DQXP@YH#XmNXi$YWX^=!G6YbYdX>XjY|XlX^XdYkX>YnXUXPYF)FXT[EVTMYmYJXmYSXmNXi#GXmT3X8HOX[ZiXN]IU2>8YdX1YbX<YfWuZ8XSXcZU%0;1XnXkZ_WTG,XZYX5YSX Yp 05G?XcYW(IXg6K/XlYP4XnI @XnO1W4Zp-9C@%QDYX+OYeX9>--YSXkD.YR%Q/Yo YUX].Xi<HYEZ2WdCE6YMXa7F)=,D>-@9/8@5=?7164;35387?N<618=6>7D+C50<6B03J0{Hj|N9$D,9I-,.KB3}m |NzE0::/81YqXjMXl7YG; [.W=Z0X4XQY]:MXiR,XgM?9$9>:?E;YE77VS[Y564760391?14941:0=:8B:;/1DXjFA-564=0B3XlH1+D85:0Q!B#:-6&N/:9<-R3/7Xn<*3J4.H:+334B.=>30H.;3833/76464665755:/83H6633:=;.>5645}&E|Y)?1/YG-,93&N3AE@5 <L1-G/8A0D858/30>8<549=@B8] V0[uVQYlXeD(P#ID&7T&7;Xi0;7T-$YE)E=1:E1GR):--0YI7=E<}n9|aT6783A>D7&4YG7=391W;Zx<5+>F#J39}o/|cc;6=A050EQXg8A1-}D-|d^5548083563695D?-.YOXd37I$@LYLWeYlX<Yd+YR A$;3-4YQ-9XmA0!9/XLY_YT(=5XdDI>YJ5XP1ZAW{9>X_6R(XhYO65&J%DA)C-!B:97#A9;@?F;&;(9=11/=657/H,<8}bz|j^5446>.L+&Y^8Xb6?(CYOXb*YF(8X`FYR(XPYVXmPQ%&DD(XmZXW??YOXZXfCYJ79,O)XnYF7K0!QXmXi4IYFRXS,6<%-:YO(+:-3Q!1E1:W,Zo}Am|n~;3580534*?3Zc4=9334361693:30C<6/717:<1/;>59&:4}6!|rS36=1?75<8}[B|s809983579I.A.>84758=108564741H*9E{L{|u%YQ<%6XfH.YUXe4YL@,>N}Tv|ve*G0X)Z;/)3@A74(4P&A1X:YVH97;,754*A66:1 D739E3553545558E4?-?K17/770843XAYf838A7K%N!YW4.$T19Z`WJ*0XdYJXTYOXNZ 1XaN1A+I&Xi.Xk3Z3GB&5%WhZ1+5#Y[X<4YMXhQYoQXVXbYQ8XSYUX4YXBXWDMG0WxZA[8V+Z8X;D],Va$%YeX?FXfX[XeYf<X:Z[WsYz8X_Y]%XmQ(!7BXIZFX]&YE3F$(1XgYgYE& +[+W!<YMYFXc;+PXCYI9YrWxGXY9DY[!GXiI7::)OC;*$.>N*HA@{C|}&k=:<TB83X`3YL+G4XiK]i}(fYK<=5$.FYE%4*5*H*6XkCYL=*6Xi6!Yi1KXR4YHXbC8Xj,B9ZbWx/XbYON#5B}Ue}+QKXnF1&YV5XmYQ0!*3IXBYb71?1B75XmF;0B976;H/RXU:YZX;BG-NXj;XjI>A#D3B636N;,*%<D:0;YRXY973H5)-4FXOYf0:0;/7759774;7;:/855:543L43<?6=E,.A4:C=L)%4YV!1(YE/4YF+ F3%;S;&JC:%/?YEXJ4GXf/YS-EXEYW,9;E}X$}547EXiK=51-?71C%?57;5>463553Zg90;6447?<>4:9.7538XgN{|!}9K/E&3-:D+YE1)YE/3;37/:05}n<}:UX8Yj4Yt864@JYK..G=.(A Q3%6K>3(P3#AYE$-6H/456*C=.XHY[#S.<780191;057C)=6HXj?955B:K1 E>-B/9,;5.!L?:0>/.@//:;7833YZ56<4:YE=/:7Z_WGC%3I6>XkC*&NA16X=Yz2$X:Y^&J48<99k8}CyB-61<18K946YO4{|N}E)YIB9K0L>4=46<1K0+R;6-=1883:478;4,S+3YJX`GJXh.Yp+Xm6MXcYpX(>7Yo,/:X=Z;Xi0YTYHXjYmXiXj;*;I-8S6N#XgY}.3XfYGO3C/$XjL$*NYX,1 6;YH&<XkK9C#I74.>}Hd`A748X[T450[n75<4439:18A107>|ET}Rf<1;14876/Yb983E<5.YNXd4149>,S=/4E/<306443G/06}0&}UkYSXFYF=44=-5095=88;63844,9E6644{PL}WA8:>)7+>763>>0/B3A545CCnT}Xm|dv}Xq1L/YNXk/H8;;.R63351YY747@15YE4J8;46;.38.>4A369.=-83,;Ye3?:3@YE.4-+N353;/;@(X[YYD>@/05-I*@.:551741Yf5>6A443<3535;.58/86=D4753442$635D1>0359NQ @73:3:>><Xn?;43C14 ?Y|X611YG1&<+,4<*,YLXl<1/AIXjF*N89A4Z576K1XbJ5YF.ZOWN.YGXO/YQ01:4G38Xl1;KI0YFXB=R<7;D/,/4>;$I,YGXm94@O35Yz66695385.>:6A#5}W7n^4336:4157597434433<3|XA}m`>=D>:4A.337370?-6Q96{`E|4A}C`|Qs{Mk|J+~r>|o,wHv>Vw}!c{H!|Gb|*Ca5}J||,U{t+{CN[!M65YXOY_*B,Y[Z9XaX[QYJYLXPYuZ%XcZ8LY[SYPYKZM<LMYG9OYqSQYM~[e{UJXmQYyZM_)>YjN1~[f3{aXFY|Yk:48YdH^NZ0|T){jVFYTZNFY^YTYN~[h{nPYMYn3I]`EYUYsYIZEYJ7Yw)YnXPQYH+Z.ZAZY]^Z1Y`YSZFZyGYHXLYG 8Yd#4~[i|+)YH9D?Y^F~Y7|-eYxZ^WHYdYfZQ~[j|3>~[k|3oYmYqY^XYYO=Z*4[]Z/OYLXhZ1YLZIXgYIHYEYK,<Y`YEXIGZI[3YOYcB4SZ!YHZ*&Y{Xi3~[l|JSY`Zz?Z,~[m|O=Yi>??XnYWXmYS617YVYIHZ(Z4[~L4/=~[n|Yu{P)|];YOHHZ}~[o33|a>~[r|aE]DH~[s|e$Zz~[t|kZFY~XhYXZB[`Y}~[u|{SZ&OYkYQYuZ2Zf8D~[v}% ~[w3},Q[X]+YGYeYPIS~[y}4aZ!YN^!6PZ*~[z}?E~[{3}CnZ=~[}}EdDZz/9A3(3S<,YR8.D=*XgYPYcXN3Z5 4)~[~}JW=$Yu.XX~] }KDX`PXdZ4XfYpTJLY[F5]X~[2Yp}U+DZJ::<446[m@~]#3}]1~]%}^LZwZQ5Z`/OT<Yh^ -~]&}jx[ ~m<z!%2+~ly4VY-~o>}p62yz!%2+Xf2+~ly4VY-zQ`z (=] 2z~o2",C={" ":0,"!":1},c=34,i=2,p,s="",u=String.fromCharCode,t=u(12539),m=[];while(++c<127)C[u(c)]=c^39&&c^92?i++:0;i=0;while(0<=(c=C[a.charAt(i++)]))if(16==c)if((c=C[a.charAt(i++)])<87){if(86==c)c=1879;while(c--){/*s+=u(*/++p/*)*/;m.push(p)}}else{/*s+=s.substr(8272,360);*/m=m.concat(m.slice(8272,8632))}else if(c<86){/*s+=u(*/p+=c<51?c-16:(c-55)*92+C[a.charAt(i++)]/*)*/;m.push(p)}else if((c=((c-86)*92+C[a.charAt(i++)])*92+C[a.charAt(i++)])<49152){/*s+=u(*/p=c<40960?c:c|57344/*)*/;m.push(p)}else{c&=511;while(c--){/*s+=t*/;m.push(12539)}p=12539}return {"array":m}')();

//var JCT8836=(JCT11280=JISX0208.s).substring(0,8836);

/**
 * U2CP,CP2U Unicode番号とJIS番号の対応テーブル
 *   Unicode番号はスカラ値、JIS番号は区点位置(1面、1～119区、1～94点)を1+7+7bitの15bit整数にしたものを用いる。
 *
 *   JCT11280はWindows-31Jのテーブルで、重複登録された漢字がある。
 *   重複登録された漢字の区点位置を求める場合はWindows APIの仕様に従い
 *    (1)JIS X 0208-1990の登録文字である場合は、これに統一
 *    (2)「NEC特殊文字」「IBM拡張文字」が重複する場合は、「NEC特殊文字」に統一
 *    (3)「NEC選定IBM拡張文字」「IBM拡張文字」が重複する場合は、「IBM拡張文字」に統一 
 *   のルールでコードポイントに変換する。
 *   言い換えると,1～88区までは先に現れたコードポイントを優先し、89～92区のNEC選定IBM拡張文字は利用せず
 *   代わりに115～119区に現れるIBM拡張文字のコードポイントを利用する
 *   
 * @see http://ja.wikipedia.org/wiki/Microsoft%E3%82%B3%E3%83%BC%E3%83%89%E3%83%9A%E3%83%BC%E3%82%B8932#Windows-31J_.E3.81.AB.E9.87.8D.E8.A4.87.E7.99.BB.E9.8C.B2.E3.81.95.E3.82.8C.E3.81.9F.E3.82.B3.E3.83.BC.E3.83.89
*/
var U2CP={},CP2U={},P1=1<<14;
(function(array) {
	var sc,cp,i,il=array.length;
	for(i=0;i<il;i++) {
		sc = array[i];
		if(sc===12539&&i>5){continue;}
		cp = P1|(i/94|0)<<7|i%94;
		CP2U[cp] = sc;
		if((i<8272||10715<i) && U2CP[sc]===undefined) {U2CP[sc] = cp;}
	}
})(JISX0208.array);

var charset={Unicode:{},SJIS:{},EUCJP:{},JIS7:{},JIS8:{},UTF7:{},UTF8:{},UTF16LE:{},UTF16BE:{},MUTF7:{}},
		enc={Text:{},Unicode:{},URI:{},Base64:{}};

/**
 * 文字列を16bit整数の配列に変換する
*/
enc.Text.parse = function(str){
	var a=[],i,il=str.length;
	for(i=0;i<il;i++) {
		a.push(str.charCodeAt(i));
	}
	return a;
};
/**
 * 16bit整数の配列を文字列に変換する
*/
enc.Text.stringify = function(array) {
	var s="",i,il=array.length,c;
	for(i=0;i<il;i++) {
		s+=String.fromCharCode(array[i]);
	}
	return s;
};
/**
 * 文字列を24bit(0..0x10FFFF)整数の配列に変換する
*/
charset.Unicode.parse = function(str){
	var a=[],i,il=str.length,c;
	for(i=0;i<il;i++) {
		//scalar                   	UTF-16
		//000uuuuuxxxxxxyyyyyyyyyy 	110110wwwwxxxxxx 110111yyyyyyyyyy 	wwww = uuuuu - 1
		55295<(c=str.charCodeAt(i))&&c<56320&&(c=((c&1023)+64<<10)+(str.charCodeAt(++i)&1023));
		a.push(c);
	}
	return a;
};
/**
 * 24bit整数の配列を文字列に変換する
*/
charset.Unicode.stringify = function(array){
	var s="",i,il=array.length,c;
	for(i=0;i<il;i++) {
		s+=(c=array[i])>65535?String.fromCharCode((c>>>10)-64|55296,(c&1023|56320)):String.fromCharCode(c);
	}
	return s;
};
charset.Unicode.fromU=charset.Unicode.toU=function(a){return a;}
//http://charset.7jp.net/sjis.html
//http://ja.wikipedia.org/wiki/Microsoft%E3%82%B3%E3%83%BC%E3%83%89%E3%83%9A%E3%83%BC%E3%82%B8932
/**
 * UTF-16の配列からSJISの8bit配列に変換する
 * @param  {Array}  array  Unicodeの24it配列
 * @return {Array}  SJISの8bit配列
*/
charset.SJIS.fromU = function(array) {
	var a=[],i,il=array.length,c,s,m;
	for(i=0;i<il;i++) {
		c=array[i];
		c<128 ? a.push(c) : 
			65376<c&&c<65440 ? a.push(c-65216) : 
/*
				(c=JCT11280.indexOf((s=String.fromCharCode(c))))<0 ? a.push(129,69) : a.push(
					(m=((c<8272?c:(c=JCT11280.lastIndexOf(s)))-(c%=188))/188)<31 ? m+129 : m+193, //mは(区-1)/2
					c+=c<63?64:65
				)
*/
				(c=U2CP[c]||-1)<0||c>31499 ? a.push(129,69) : a.push(
					(m=(c>>>7&127),c=(c&127)+(m&1)*94,m=m>>>1)<31 ? m+129 : m+193,
					c+=c<63?64:65
				)

	}
	return a;
};
/**
 * SJISの8bit配列をUnicodeの配列に変換する
 * @param  {Array}  array SJISの8bit配列
 * @return {Array}  Unicodeの24bit配列
*/
charset.SJIS.toU = function(array) {
	var a=[],i,il=array.length,c;
	for(i=0;i<il;i++) {
		c = array[i];
		(c<128||160<c&&c<224) 
			? a.push(160<c?c+65216:c) //ASCII+ｶﾅ
//			: a.push( JCT11280.charAt((c<160?c-129:c-193)*188+(c=array[++i],c<127?c-64:c-65)).charCodeAt(0) )
			: a.push( CP2U[P1|(c<160?c-129:c-193)<<8|(c=array[++i],c<127?c-64:c<159?c-65:c-31)] )
	}
	return a;
};
//http://www.unixuser.org/~euske/doc/kanjicode/
// JIS区点位置からSJISに変換
charset.SJIS.fromJ = function(array) {
	var a=[],i,il=array.length,c,m;
	for(i=0;i<il;i++) {
		c=array[i];
		c<224 ? a.push(c)
			: c>31499 ? a.push(129,69)
				: a.push(
					(m=(c>>>7&127),c=(c&127)+(m&1)*94,m=m>>>1)<31 ? m+129 : m+193,
					c+=c<63?64:65
				)
	}
	return a;
};
charset.SJIS.toJ = function(array) {
	var a=[],i,il=array.length,c,k;
	for(i=0;i<il;i++) {
		c = array[i];
		(c<128||160<c&&c<224) ? a.push(c) //ASCII+ｶﾅ
			: a.push( P1|(c<160?c-129:c-193)<<8|(c=array[++i],c<127?c-64:c<159?c-65:c-31) )
	}
	return a;
};
//http://ja.wikipedia.org/wiki/EUC-JP, http://charset.7jp.net/euc.html
charset.EUCJP.fromU = function(array) {
	var a=[],i,il=array.length,c;
	for(i=0;i<il;i++) {
		(c=array[i])<128 ? a.push(c) : 
			65376<c&&c<65440 ? a.push(142,c-65216) : 
/*
				(c=JCT8836.indexOf(String.fromCharCode(c)))<0 ? a.push(161,166) : (
					a.push((c-(c%=94))/94+161, c+161)
*/
				(c=U2CP[c]||-1)<0||c>31499 ? a.push(161,166) : (
					a.push((c>>>7&127)+161, (c&127)+161)
				)
	}
	return a;
};
charset.EUCJP.toU = function(array) {
	var a=[],i,il=array.length,c;
	for(i=0;i<il;i++) {
		c = array[i];
		(c<161)
			? a.push(c<128 ? c : array[++i]+65216) //ASCII+ｶﾅ
//			: a.push(JCT8836.charAt((c-161)*94 + array[++i]-161).charCodeAt(0))
				: a.push(CP2U[P1|(c-161)<<7|array[++i]-161])
	}
	return a;
};
charset.EUCJP.fromJ = function(array) {
	var a=[],i,il=array.length,c;
	for(i=0;i<il;i++) {
		(c=array[i])<224 ? a.push(c<128?c:c+65216)
			: c>31499 ? a.push(161,166)
				: a.push((c>>>7&127)+161, (c&127)+161)
	}
	return a;
};
charset.EUCJP.toJ = function(array) {
	var a=[],i,il=array.length,c;
	for(i=0;i<il;i++) {
		c = array[i];
		(c<161) ? a.push(c<128 ? c : array[++i]) //ASCII+ｶﾅ
			: a.push( P1|(c-161)<<7|array[++i]-161 )
	}
	return a;
};
//http://charset.7jp.net/jis.html, http://yasu.asuka.net/translations/RFC1468.html
charset.JIS7.fromU = function(array) {
	var a=[],i,il=array.length,c,es=[0,1,2],e=es[0]; //"\e(B":ASCIIの開始,"\e(I":半角カタカナの開始,"\e$B":漢字の開始
	for(i=0;i<il;i++) {
		(c=array[i])<128 ? ((e!=es[0] && (e=es[0],a.push(27,40,66))),a.push(c))
			: 65376<c&&c<65440 ? ((e!=es[1] && (e=es[1],a.push(27,40,73))),a.push(c-65344))
				: (e!=es[2] && (e=es[2],a.push(27,36,66)),
//					(c=JCT8836.indexOf(String.fromCharCode(c)))<0 ? a.push(33,38) : a.push((c-(c%=94))/94+33,c+33))
						(c=U2CP[c]||-1)<0||c>31499 ? a.push(33,38) : a.push((c>>>7&127)+33,(c&127)+33))
	}
	e!==es[0] && a.push(27,40,66); //ASCIIで終わっている必要がある
	return a;
};
charset.JIS7.toU = function(array) {
// "\e(B":ASCIIの開始,"\e(I":半角カタカナの開始,"\e$B":漢字の開始, "\e(J":ローマ字セット(≒ASCII)開始, "\e$@":漢字の開始(旧)
// 0x1b2842(27,40,66), 0x1b2849(27,40,73),      0x1b2442(27,36,66), 0x1b284a(27,40,74),  0x1b2440(27,36,64)
// [27,40,66]or[27,40,74]ならASCII、[27,40,73]なら半角カナ、[27,36,66]or[27,36,64]なら漢字としてデコードする
	var a=[],i,il=array.length,c,es=[0,1,2],e=es[0];
	for(i=0;i<il;i++) {
		array[i]===27 && (array[++i]===36?(e=es[2],i+=2):(e=(array[++i]===73?es[1]:es[0]),i++));
		(i<il)&&(c=array[i]) && ( 
//			e===es[2] ? a.push(JCT8836.charAt((c-33)*94+array[++i]-33).charCodeAt(0))
				e===es[2] ? a.push(CP2U[P1|c-33<<7|array[++i]-33])
				: e===es[1] ? a.push(c+65344)
					: a.push(c<128 ? c : c+65216)
		);
	}
	return a;
};
charset.JIS7.fromJ = function(array) {
	var a=[],i,il=array.length,c,es=[0,1,2],e=es[0];
	for(i=0;i<il;i++) {
		(c=array[i])<128 ? ((e!=es[0] && (e=es[0],a.push(27,40,66))),a.push(c))
			: 160<c&&c<224 ? ((e!=es[1] && (e=es[1],a.push(27,40,73))),a.push(c))
				: (e!=es[2] && (e=es[2],a.push(27,36,66)),
					c<P1||c>31499 ? a.push(33,38) : a.push((c>>>7&127)+33,(array[++i]&127)+33))
	}
	e!==es[0] && a.push(27,40,66); //ASCIIで終わっている必要がある
	return a;
};
charset.JIS7.toJ = function(array) {
	var a=[],i,il=array.length,c,es=[0,1,2],e=es[0];
	for(i=0;i<il;i++) {
		array[i]===27 && (array[++i]===36?(e=es[2],i+=2):(e=(array[++i]===73?es[1]:es[0]),i++));
		(i<il)&&(c=array[i]) && ( 
			e===es[2] ? a.push(P1|c-33<<7|array[++i]-33)
				: e===es[1] ? a.push(c+128) : a.push(c)
		);
	}
	return a;
};
charset.JIS = charset.JIS7;
// JIS7と違い半角カナは ASCIIシーケンス[\e(B]のA1-DFに入る
charset.JIS8.fromU = function(array) {
	var a=[],i,il=array.length,c,es=[0,1,2],e=es[0];
	for(i=0;i<il;i++) {
		(c=array[i])<128||65376<c&&c<65440 ? ((e!=es[0] && (e=es[0],a.push(27,40,66))),a.push(c<128?c:c-65216))
			: (e!==es[2] && (e=es[2],a.push(27,36,66)),
//				(c=JCT8836.indexOf(String.fromCharCode(c)))<0 ? a.push(33,38) : a.push((c-(c%=94))/94+33,c+33))
					(c=U2CP[c]||-1)<0||c>31499 ? a.push(33,38) : a.push((c>>>7&127)+33,(c&127)+33))
	}
	e!==es[0] && a.push(27,40,66);
	return a;
};
// 半角カナシーケンスも念のため考慮する
charset.JIS8.toU = function(array) {
	var a=[],i,il=array.length,c,es=[0,1,2],e=es[0];
	for(i=0;i<il;i++) {
		array[i]===27&&(array[++i]===36?(e=es[2],i+=2):(e=(array[++i]===73?es[1]:es[0]),i++));
		(i<il)&&(c=array[i]) && (
//			e===es[2] ? a.push(JCT8836.charAt((c-33)*94+array[++i]-33).charCodeAt(0))
				e===es[2] ? a.push(CP2U[P1|c-33<<7|array[++i]-33])
				: e===es[1] ? a.push(c+65344)
					: a.push(c<128 ? c : c+65216)
		);
	}
	return a;
};
charset.JIS8.fromJ = function(array) {
	var a=[],i,il=array.length,c,es=[0,1,2],e=es[0];
	for(i=0;i<il;i++) {
		(c=array[i])<128||160<c&&c<224 ? ((e!=es[0] && (e=es[0],a.push(27,40,66))),a.push(c))
			: (e!==es[2] && (e=es[2],a.push(27,36,66)),
				c<P1||c>31499 ? a.push(33,38) : a.push((c>>>7&127)+33,(array[++i]&127)+33))
	}
	e!==es[0] && a.push(27,40,66);
	return a;
};
charset.JIS8.toJ = charset.JIS7.toJ;
//http://ja.wikipedia.org/wiki/UTF-7 http://suika.fam.cx/~wakaba/wiki/sw/n/UTF-7
//62のアルファベットと9の記号 ['(),-./:?] はそのまま表記する。
// [\t\n\r !"#$%&*;<=>@[]^_`{|}]は表記してもいいし符号化してもいい(fromUでは符号化する)
charset.UTF7.fromU = function(array) {
	var a=[],i,il=array.length,c,tmp=[];
	for(i=0;i<il;i++) {
		c = array[i];
		38<c&&c<59&&c!=42||c===63||64<c&&c<91||96<c&&c<123 ? (a.push(c),c===43&&a.push(45)) : (a.push(43),tmp.push(c))
		if (tmp.length>0) {
			while((c=array[i+1]) && !(38<c&&c<59&&c!=42||c===63||64<c&&c<91||96<c&&c<123)) {tmp.push(c);i++;}
			a = a.concat(enc.Base64.fromU(tmp,charset.UTF16BE));
			a.push(45);
			tmp=[];
		}
	}
	return a;
};
charset.UTF7.toU = function(array) {
	var a=[],i,il=array.length,c,tmp=[];
	for(i=0;i<il;i++) {
		c = array[i];
		8<c&&c<11||c===13||31<c&&c<126&&c!==43&&c!==92
			? a.push(c) // (?![^+\\~])[ !-}]
			: c===43 // "+"
				? (c=array[++i])===45 // "-"
					? a.push(c)   // "+-" => "+"
					: tmp.push(c) // Base64
				: a.push(63); //不正な文字は?に
		if (tmp.length>0) {
			while((c=array[i+1]) && (c===43||46<c&&c<58||64<c&&c<91||96<c&&c<123)) {tmp.push(c);i++;}
			array[i+1]===45 && i++; // 直後がBase64以外の文字なら-を省略可能(直後が-だったら-はスキップしそれ以外だったら次に読む)
			a = a.concat(enc.Base64.toU(tmp,charset.UTF16BE));
			tmp=[];
		}
	}
	return a;
};
// Modified UTF-7 の実装 http://tools.ietf.org/rfc/rfc3501.txt
/*
5.1.3.  Mailbox International Naming Convention

   By convention, international mailbox names in IMAP4rev1 are specified
   using a modified version of the UTF-7 encoding described in [UTF-7].
   Modified UTF-7 may also be usable in servers that implement an
   earlier version of this protocol.

   In modified UTF-7, printable US-ASCII characters, except for "&",
   represent themselves; that is, characters with octet values 0x20-0x25
   and 0x27-0x7e.  The character "&" (0x26) is represented by the
   two-octet sequence "&-".

   All other characters (octet values 0x00-0x1f and 0x7f-0xff) are
   represented in modified BASE64, with a further modification from
   [UTF-7] that "," is used instead of "/".  Modified BASE64 MUST NOT be
   used to represent any printing US-ASCII character which can represent
   itself.

   "&" is used to shift to modified BASE64 and "-" to shift back to
   US-ASCII.  There is no implicit shift from BASE64 to US-ASCII, and
   null shifts ("-&" while in BASE64; note that "&-" while in US-ASCII
   means "&") are not permitted.  However, all names start in US-ASCII,
   and MUST end in US-ASCII; that is, a name that ends with a non-ASCII
   ISO-10646 character MUST end with a "-").
*/
charset.MUTF7.fromU = function(array) {
	var a=[],i,il=array.length,c,tmp=[];
	for(i=0;i<il;i++) {
		c = array[i];
		31<c&&c<127 ? (a.push(c),c===38&&a.push(45)) : (a.push(38),tmp.push(c))
		if (tmp.length>0) {
			while((c=array[i+1]) && (c<32||126<c)) {tmp.push(c);i++;}
			tmp = enc.Base64.fromU(tmp,charset.UTF16BE);
			for(j=0;j<tmp.length;j++){tmp[j]===47&&(tmp[j]=44)}; // "/" => ","
			a = a.concat(tmp);
			a.push(45);
			tmp=[];
		}
	}
	return a;
};
charset.MUTF7.toU = function(array) {
	var a=[],i,il=array.length,c,tmp=[];
	for(i=0;i<il;i++) {
		c = array[i];
		31<c&&c<127&&c!==38
			? a.push(c) // &以外
			: c===38 // "&"
				? (c=array[++i])===45 // "-"
					? a.push(38)   // "&-" => "&"
					: tmp.push(c) // Base64
				: a.push(65533); //不正な文字は\ufffdに
		if (tmp.length>0) {
			while((c=array[i+1]) && (42<c&&c<45||47<c&&c<58||64<c&&c<91||96<c&&c<123)) {tmp.push(c===44?47:c);i++;}
			array[i+1]===45 && i++;
			a = a.concat(enc.Base64.toU(tmp,charset.UTF16BE));
			tmp=[];
		}
	}
	return a;
};
charset.UTF8.fromU = function(array) {
	var a=[],i,il=array.length,c;
	for(i=0;i<il;i++) {
		(c=array[i])<128 ? a.push(c)
			: c<2048 ? a.push(c>>>6|192,c&63|128)
				: c<65536 ? a.push(c>>>12|224,c>>>6&63|128,c&63|128)
					: a.push(c>>>18|240,c>>>12&63|128,c>>>6&63|128,c&63|128)
	}
	return a;
};
charset.UTF8.toU = function(array) {
	var a=[],i=0,il=array.length,c;
	array[0]===239&&array[1]===187&&array[2]===191&&(i=3);//BOM
	for(;i<il;i++) a.push(
		(c=array[i])<128 ? c
			: c<224 ? (c&31)<<6|array[++i]&63
				: c<240 ? ((c&15)<<6|array[++i]&63)<<6|array[++i]&63
					: (((c&7)<<6|array[++i]&63)<<6|array[++i]&63)<<6|array[++i]&63
	);
	return a;
};
charset.UTF16LE.fromU = function(array) {
	var a=[],i,il=array.length,c,m;
	for(i=0;i<il;i++) {
		//scalar                   	UTF-16
		//000uuuuuxxxxxxyyyyyyyyyy 	110110wwwwxxxxxx 110111yyyyyyyyyy 	wwww = uuuuu - 1
		(c=array[i])>65535&&(m=(c>>>10)-64|55296,a.push(m&255,m>>>8),c=(c&1023|56320));
		a.push(c&255,c>>>8);
	}
	return a;
};
charset.UTF16LE.toU = function(array) {
	var a=[],i=0,il=array.length,c;
	array[0]===255&&array[1]===254&&(i=2);
	for(;i<il;i++) {
		c=array[i]|array[++i]<<8;
		55295<c&&c<56320&&(c=((c&1023)+64<<10)+((array[++i]|array[++i]<<8)&1023));
		a.push(c);
	}
	return a;
};
charset.UTF16BE.fromU = function(array) {
	var a=[],i,il=array.length,c,m;
	for(i=0;i<il;i++) {
		(c=array[i])>65535&&(m=(c>>>10)-64|55296,a.push(m>>>8,m&255),c=(c&1023|56320));
		a.push(c>>>8,c&255);
	}
	return a;
};
charset.UTF16BE.toU = function(array) {
	var a=[],i=0,il=array.length,c;
	array[0]===254&&array[1]===255&&(i=2);
	for(;i<il;i++) {
		c=array[i]<<8|array[++i];
		55295<c&&c<56320&&(c=((c&1023)+64<<10)+((array[++i]<<8|array[++i])&1023));
		a.push(c);
	}
	return a;
};
charset.UTF16 = charset.UTF16BE;
/**
 * convert_array
 *   他の文字コード配列に変換する
 * @param {Array}            array  変換前配列
 * @param {String or Object} to     変換先の文字コード('SJIS','UTF8',ECL.charset.SJIS,など)
 * @param {String or Object} from   変換元の文字コード('SJIS','UTF8',ECL.charset.SJIS,など)
 * @return {Array} 変換後配列
*/
charset.convert_array = function(array, to, from) {
	from=from||charset.Unicode;
	(!from.hasOwnProperty("toU")) && (from=charset[from]);
	(!to.hasOwnProperty("fromU")) && (to=charset[to]);
	if (to==from) {return array;}
	if(from.hasOwnProperty("toJ") && to.hasOwnProperty("fromJ")) return to.fromJ(from.toJ(array));
	return to.fromU(from.toU(array));
}
/**
 * convert
 *   他の文字コードに変換する
 * @param {String}           str  変換前文字列
 * @param {String or Object} to   変換先の文字コード('SJIS','UTF8',ECL.charset.SJIS,など)
 * @param {String or Object} from 変換元の文字コード('SJIS','UTF8',ECL.charset.SJIS,など)
 * @return {String} 変換後文字列
*/
charset.convert = function(str, to, from) {
	var array,parser;
	from=from||charset.Unicode;
	(!from.hasOwnProperty("toU"))&&(from=charset[from]);
	(!to.hasOwnProperty("fromU"))&&(to=charset[to]);
	if (to==from) {return str;}
	parser = from===charset.Unicode ? from : enc.Text;
	array = parser.parse(str);
	return charset.Unicode.stringify(charset.convert_array(array, to, from));
};
/**
 * Unicode配列をBase64符号化する
 * @param  {Array}         array 24bit配列
 * @param  {String|Object} to    変換する文字コード(default:UTF8)
 * @return {Array} Base64符号化された6bit配列
*/
enc.Base64.fromU = function(array, to) {
	(!(to=to||'UTF8').hasOwnProperty("fromU"))&&(to=charset[to]);
	return enc.Base64.fromB(to.fromU(array));
};
/**
 * Base64符号化された6bit配列をUnicode配列にする
 * @param  {Array} array        Base64符号化された6bit配列
 * @param  {String|Object} from 変換する文字コード(default:UTF8)
 * @return {Array} 24bit配列
*/
enc.Base64.toU = function(array, from) {
	(!(from=from||'UTF8').hasOwnProperty("toU"))&&(from=charset[from]);
	return from.toU(enc.Base64.toB(array));
};
/**
 * 8bit配列をBase64符号化する
 * @param  {Array} 8bit配列
 * @return {Array} Base64符号化された6bit配列
*/
enc.Base64.fromB = function(array) {
	var a=[],i=0,il=array.length,
			b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",B=[],c;
	for(i=0;i<64;i++) B.push(b.charCodeAt(i));
	for(i=0;i<il;i++) a.push(B[(c=array[i])>>>2],B[(c&3)<<4|(c=array[++i])>>>4],B[(c&15)<<2|(c=array[++i])>>>6],B[63&c]);
	(i=il%3)!==0&&(a.pop(),i===1&&a.pop());
	return a;
};
/**
 *  Base64符号化された6bit配列を8bit配列にする
 * @param  {Array} Base64符号化された6bit配列
 * @return {Array} 8bit配列
*/
enc.Base64.toB = function(array) {
	var i=0,a=[],il=array.length,B={},b,c;
	while(i<64)B["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(i)]=i++;
	for(i=0;i<il;i++) a.push((c=B[array[i]])<<2|(c=B[array[++i]])>>>4,(c&15)<<4|(c=B[array[++i]])>>>2,(c&3)<<6|B[array[++i]]);
	(i=il%4)!==0&&(a.pop(),i<3&&a.pop());
	return a;
};
enc.Base64.parse = function(str) {
	str=str.replace(/=+$/,'');
	return enc.Base64.toB(enc.Text.parse(str));
};
enc.Base64.stringify = function(array) {
	return enc.Text.stringify(enc.Base64.fromB(array));
};
/**
 * 文字列をBase64エンコードする
 * この関数はpaddingの=を追加する
 * @param {String} str         変換する文字列
 * @param {String|Object} cs1  strの文字セット default:Unicode
 * @param {String|Object} cs2  cs1がUnicodeだった場合の変換先文字セット default:UTF8
 * @return {String} Base64符号化された文字列
 *
 * @example
 *  // JS文字列をUTF8としてBase64符号化
 *  ECL.encodeBase64("文字列"); //=> "5paH5a2X5YiX==="
 *  ECL.encodeBase64("文字列", "Unicode", "UTF8"); // 上記と同じ
 * 
 *  // SJIS文字列をエンコード(引数は省略不可)
 *  ECL.encodeBase64(ECL.convert("文字列", "SJIS"), "SJIS"); //=> "lbaOmpfx==="
 *
*/
enc.Base64.encode = function(str, cs1, cs2) {
	var array,parser,b;
	(!(cs1=cs1||'Unicode').hasOwnProperty("parse"))&&(cs1=charset[cs1]);
	(!(cs2=cs2||'UTF8').hasOwnProperty("fromU"))&&(cs2=charset[cs2]);
	parser = cs1===charset.Unicode ? cs1 : enc.Text;
	array = parser.parse(str);
	b=enc.Base64.stringify(cs1===charset.Unicode?cs2.fromU(array):array);
	b+="===".substring(0,4-b.length%4);
	return b;
};
/**
 * Base64文字列をデコードする
 * この関数はpaddingの=を削除する
 * @param {String} str         Base64文字列
 * @param {String|Object} from 元の文字セット指定すればJS文字列に変換する default:UTF8
 * @return {String} デコードされた文字列
 *
 * @example
 *  // Base64符号化されたUTF8文字列をJS文字列に
 *  ECL.decodeBase64("5paH5a2X5YiX===");         //=> "文字列"
 *  ECL.decodeBase64("5paH5a2X5YiX===", "UTF8"); //=> "文字列"
 * 
 *  // エンコードされたSJIS文字列
 *  ECL.decodeBase64("lbaOmpfx===", ""); //=> "\x95\xb6\x8e\x9a\x97\xf1"
 *  ECL.decodeBase64("lbaOmpfx===", "SJIS"); //=> "文字列"
 *
*/
enc.Base64.decode = function(str, from) {
	str=str.replace(/=+$/,'');
	var array = enc.Base64.parse(str)
	if (from==="") {
		return enc.Text.stringify(array);
	}
	(!(from=from||'UTF8').hasOwnProperty("toU"))&&(from=charset[from]);
	return charset.Unicode.stringify(from.toU(array));
};
/**
 * enc.URI.escape
 *   RFC3986に準じて [A-Za-z0-9_.~-] 以外を%エスケープする
 *   RFC2396準拠のencodeURIComponent()と違い [!*'()] もエスケープする
 *   arrayは8bitを想定しているのでUnicode(24bit)配列を渡すと正しい結果にならない
 * @param  {Array}   array      8bit配列
 * @param  {Boolean} asRFC2396  [!*'()]をエスケープしない (default:false)
 * @return {String}  encoded    エスケープされた文字列
 *
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 *   encodeURIComponent は、次を除く全ての文字をエスケープします。: アルファベット、数字、- _ . ! ~ * ' ( )
 *   ... より厳格に RFC 3986に従う場合には、「!」・「'」・「(」・「)」・「*」の各文字が予約されています
 * @see http://www.ipa.go.jp/security/fy21/reports/tech1-tg/b_09.html
 *   なお、上記の "!", "'", "(", ")", "*" が sub-delims の文字であるが、これらは RFC 2396 では unreserved に属していた。
*/
enc.URI.escape = function(array, asRFC2396) {
	var s="",i,il=array.length,c;
	if (asRFC2396) {
			for(i=0;i<il;i++) s+=(c=array[i])<58&&c>38||64<c&&c<91||96<c&&c<123&&c!=43&&c!=44&&c!=47||c===33||c===95||c===126?String.fromCharCode(c):(c<16?"%0":"%")+c.toString(16).toUpperCase();
	} else {
		for(i=0;i<il;i++) s+=(c=array[i])<58&&c>47||64<c&&c<91||96<c&&c<123||c===45||c===46||c===95||c===126?String.fromCharCode(c):(c<16?"%0":"%")+c.toString(16).toUpperCase();
	}
	return s;
};
enc.URI.unescape = function(str) {
	var a=[],i,il=str.length,c;
	for(i=0;i<il;i++)a.push((c=str.charCodeAt(i))===37?parseInt(str.substring(++i,++i+1),16):c===43?20:c);
	return a;
};
/**
 * encodeURIComponent 互換の関数
 * @param  {String} str       JS文字列
 * @param  {String or Object} 変換先文字コード(default:'UTF8')
 * @return {String} encoded
*/
enc.URI.encodeURIComponent = function(str, to) {
	(!(to||"UTF8").hasOwnProperty("fromU"))&&(to=charset[to]);
	return enc.URI.escape(to.fromU(charset.Unicode.parse(str)));
};
enc.URI.decodeURIComponent = function(str, from) {
	(!(from||"UTF8").hasOwnProperty("toU"))&&(from=charset[from]);
	return charset.Unicode.stringify(from.toU(enc.URI.unescape(str)));
};
/**
 * enc.Unicode.escape
 *   Unicode(24bit整数)配列を%エスケープする(0xff以上は%uXXXXになる)
 *   [*+\-\.\/@_0-9A-Za-z] 以外はエスケープされる
 *   
 * @param  {Array}   u24array 24bit整数の配列(String#charCodeAt() で取得した整数など)
 * @return {String}  escaped  %エスケープされた文字列
 */
enc.Unicode.escape = function(u24array) {
	var s="",i,il=u24array.length,c;
	for(i=0;i<il;i++) {
		c=u24array[i];
		s += 41<c&&c<58&&c!=44||63<c&&c<91||94<c&&c<123&&c!=96?String.fromCharCode(c):(c<16?"%0":c<256?"%":c<4096?"%u0":"%u")+c.toString(16).toUpperCase();
	}
	return s;
};
/**
 * enc.Unicode.unescape
 *   %エスケープされた文字列をUnicode(24bit整数)配列にする
 *   
 * @return {String}  escaped  %エスケープされた文字列
 * @param  {Array}   u24array 24bit整数の配列
 */
enc.Unicode.unescape = function(str) {
	var a=[],i,il=str.length,c;
	for(i=0;i<il;i++){
		a.push(
			(c=str.charCodeAt(i))===37 //%
			? (c=str.charCodeAt(++i))===117 //%u
				? parseInt(str.charAt(++i)+str.charAt(++i)+str.charAt(++i)+str.charAt(++i)+((c=str.charAt(i+1))!=="%"?(++i,c):''),16)
				: parseInt(str.charAt(i)+str.charAt(++i),16)
			: c
		);
	}
	return a;
};
/**
 * enc.TextEncoder class
 * Encoding StandardのTextEncoderのように振る舞うクラス
 * @see https://encoding.spec.whatwg.org/
 * @see https://developer.mozilla.org/ja/docs/Web/API/TextEncoder
 */
enc.TextEncoder = function(encoding) {
	var en, map = {'UTF8':[], 'UTF16LE':['UTF16'], 'UTF16BE':[], 'SJIS':['SHIFTJIS','WINDOWS31J','XSJIS'], 'EUCJP':['XEUCJP'], 'JIS7':['iso2022jp']}, m={}, x, i;
	if (!encoding) {encoding = 'UTF-8';}
	for(x in map) {
		m[x] = x;
		for(i=0; i<map[x].length; i++) {m[map[x][i]] = x;}
	}
	en = m[encoding.toUpperCase().replace(/[^A-Z0-9]/g,'')];
	if (!en) {throw new TypeError(encoding+" is not supported encoding");}
	this.encoding = encoding;
	this.encode = function(text) {
		return new Uint8Array(charset[en].fromU(enc.Text.parse(text)));
	};
};
/**
 * enc.TextDecoder class
 * Encoding StandardのTextDecoderのように振る舞うクラス
 * @see https://encoding.spec.whatwg.org/
 * @see https://developer.mozilla.org/ja/docs/Web/API/TextEncoder
 */
enc.TextDecoder = function(encoding) {
	var en, map = {'UTF8':[], 'UTF16LE':['UTF16'], 'UTF16BE':[], 'SJIS':['SHIFTJIS','WINDOWS31J','XSJIS'], 'EUCJP':['XEUCJP'], 'JIS7':['iso2022jp']}, m={}, x, i;
	if (!encoding) {encoding = 'UTF-8';}
	for(x in map) {
		m[x] = x;
		for(i=0; i<map[x].length; i++) {m[map[x][i]] = x;}
	}
	en = m[encoding.toUpperCase().replace(/[^A-Z0-9]/g,'')];
	if (!en) {throw new TypeError(encoding+" is not supported encoding");}
	this.encoding = encoding;
	this.decode = function(u8array) {
		return enc.Text.stringify(charset[en].toU(u8array));
	};
};
/**
 * 配列から文字コードを推測する
 * ecl.jsのGetEscapeCodeType(str)に丸投げしている
*/
charset.guess_array = function(array) {
	var i,il=array.length,c=array[0],cs=null,p,a,m,u7,mu7,pm,am,b64,mb64;
	//BOM 0xEFBBBF:UTF8, 0xFEFF:UTF16BE, 0xFFFE:UTF16LE
	cs=c===239&&array[1]===187&&array[2]===191?"UTF8":c===255&&array[1]===254?"UTF16LE":c===254&&array[1]===255?"UTF16BE":null;
	if(cs!=null) return cs;
	//Unicode or ASCII(maybe UTF7,MUTF7) or ...?
	cs="ASCII",p=a=m=-1,u7=mu7=true,pm=am=b64=mb64=0;
	for(i=0;i<il;i++){
		c=array[i];
		if(255<c){cs="Unicode";break;}
		if(c<32&&c!==9&&c!==10&&c!==13||126<c){cs=null;break;} //未定
		if (!u7&&!mu7) continue; //UTF-7でもModified UTF-7でもないならこの先を省略
		c===126&&(u7=false); //UTF-7は~を符号化するがModifiedUTF-7は~をそのまま印字する
		8<c&&c<11||c===13 && (mu7=false); //Modified UTF-7は\t\n\rを符号化する
		//"+-" or "\+[A-Za-z0-9\+\/]+-" があればUTF7 "&" ならMUTF7
		if (c===45) { // [+&]- の出現数をカウント
			p>=0&&u7 ? (i===p+1&&(pm++),(p=-1)) : a>=0&&mu7 && (i===a+1&&(am++),(a=-1));
			p = a = -1;
		} else {
			if (u7&&p>=0) { //Base64 [A-Za-z0-9+/] かどうか
				(u7 = (c===43||46<c&&c<58||64<c&&c<91||96<c&&c<123)) ? b64++ : (p=-1);
			}
			if (mu7&&a>=0) { //Modified Base64 [A-Za-z0-9+,] かどうか
				(mu7 = (42<c&&c<45||47<c&&c<58||64<c&&c<91||96<c&&c<123)) ? mb64++ : (a=-1);
			}
		}
		c===43&&p<0 ? (p=i) : c===38&&a<0 ? (a=i) : c===45 && (m=i);
	}
	if (cs==="ASCII") {
		cs = u7&&(b64>0||pm>0) ? "UTF7" : mu7&&(mb64>0||am>0) ? "MUTF7" : "ASCII";
	}
	//TODO: GetEscapeCodeTypeの代替処理が未実装
	return cs?cs:GetEscapeCodeType(enc.URI.escape(array));
};
charset.guess = function(str) {
	return charset.guess_array(enc.Text.parse(str));
};
var names=["SJIS","EUCJP","JIS7","JIS8","Unicode","UTF7","UTF8","UTF16LE","UTF16BE","MUTF7"],i,il=names.length;
ECL.charset=charset;
for(i=0;i<il;i++) {
	if (names[i]==='Unicode') {
		ECL["escapeUnicode"] = function(str){return enc.Unicode.escape(charset.Unicode.parse(str));};
		ECL["unescapeUnicode"] = function(str){return charset.Unicode.stringify(enc.Unicode.unescape(str));};
	} else {
		ECL["escape"+names[i]] = (function(fnc,cs){return function(str){return fnc(str,cs);};})(enc.URI.encodeURIComponent, charset[names[i]]);
		ECL["unescape"+names[i]] = (function(fnc,cs){return function(str){return fnc(str,cs);};})(enc.URI.decodeURIComponent, charset[names[i]]);
		ECL.charset[names[i]].parse = (function(fnc){return function(str){return fnc(enc.Text.parse(str));};})(charset[names[i]].toU);
		ECL.charset[names[i]].stringify = (function(fnc){return function(array){return enc.Text.stringify(fnc(array));};})(charset[names[i]].fromU);
	}
}
ECL.convert = charset.convert;
ECL.convert_array = charset.convert_array;
ECL.enc=enc;
ECL.escape = ECL.escapeUnicode;
ECL.unescape = ECL.unescapeUnicode;
ECL.encodeURIComponent = enc.URI.encodeURIComponent;
ECL.decodeURIComponent = enc.URI.decodeURIComponent;
ECL.encodeBase64 = enc.Base64.encode;
ECL.decodeBase64 = enc.Base64.decode;
ECL.TextEncoder = enc.TextEncoder;
ECL.TextDecoder = enc.TextDecoder;
//ECL.getEscapeCodeType = GetEscapeCodeType;
ECL.JCT11280 = JCT11280;
ECL.JCT8836 = JCT8836;

ECL.JISX0208={"U2CP":U2CP, "CP2U":CP2U};

})();