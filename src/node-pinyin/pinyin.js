// 单字拼音词库
var PINYIN_DICT = require("./pinyin-dict");
// 词语拼音库
var PHRASES_DICT = require("./phrases-dict.js");
// 注音符号
var PHONETIC_SYMBOL = require("./phonetic-symbol.js");

/**
 * 词语注音
 * @param {String} segment, 词组
 * @return {Array} 返回的拼音首字母序列
 */
function convert_to_pinyin(segment) {
  if (PHRASES_DICT.hasOwnProperty(segment)) {
    var phrase_pinyin = PHRASES_DICT[segment];
    return phrase_pinyin.map(function(char_pinyin) {
      let char_initial_first_letter = char_pinyin.charAt(0);
      if (PHONETIC_SYMBOL.hasOwnProperty(char_initial_first_letter)) {
        return PHONETIC_SYMBOL[char_initial_first_letter].charAt(0);
      }
      
      return char_initial_first_letter.toLowerCase();
    });
  } else {
    return segment.split("").map(function(char) {
      if (PINYIN_DICT.hasOwnProperty(char)) {
        let char_initial_first_letter = PINYIN_DICT[char].split(",")[0].charAt(0);
        if (PHONETIC_SYMBOL.hasOwnProperty(char_initial_first_letter)) {
          return PHONETIC_SYMBOL[char_initial_first_letter].charAt(0);
        }
        
        return char_initial_first_letter.toLowerCase();
      }
      
      return [char];
    });
  }
}

/**
 * @param {String} segments 要转为拼音的词组序列
 * @return {Array} 返回的拼音首字母序列
 */
function pinyin_first_letter_seq(segments) {
  if ("object" !== typeof segments && !segments.length) { return []; }
  var result = [];
  for (var i = 0, l = segments.length; i < l; i++) {
    result.push(convert_to_pinyin(segments[i]));
  }
  // console.log(result.flat().join(""));
  return result.flat().join("");
}

module.exports = { pinyin_first_letter_seq };