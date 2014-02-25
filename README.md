ecl_array.js
============

文字コード変換とエスケープのためのライブラリ

## 文字コード変換
Shift_JIS(CP932),EUC-JP,JIS(iso-2022-jp),UTF-8,UTF-16BE,UTF-16LE,UTF-7,Modified UTF-7を相互変換

## エスケープ・アンエスケープ
Base64,URLエスケープ(%XX),Unicodeエスケープ(%uXXXX)を実装


## サンプルコード

```js
// Javascript文字列をShift_JISに変換しBase64エンコードする
var str = "Markdownの書式がよくわかりません！！",
    sjis = ECL.charset.convert(str, "SJIS"),
    encoded = ECL.encodeBase64(sjis); //=> "TWFya2Rvd27CgsOMwo/CkcKOwq7CgsKqwoLDpsKCwq3CgsOtwoLCqcKCw6jCgsOcwoLCucKCw7HCgUnCgUk="

// SJISをEUC-JPに変換して%エスケープ
var escaped = ECL.escape(ECL.charset.convert(sjis, "EUCJP", "SJIS"));
ECL.convert(ECL.unescape(escaped),"SJIS","EUCJP")==sjis; //=> true

// Javascript文字列をUTF-8に変換してURLエスケープ(encodeURIComponent互換)
urlencoded = ECL.encodeURIComponent(str,"UTF8");
decodeURIComponent(urlencoded)==str; //=> true

```

## 参考

* Escape Codec Library: ecl.js (Ver.041208) http://www.junoe.jp/downloads/itoh/enc_js.shtml または http://www.vector.co.jp/soft/other/java/se342855.html

ecl_array.js内で利用しているJIS漢字テーブルはecl.jsのものをそのまま利用しています