const fs = require('fs');
const path = require('path');

// 音声ファイルを生成するための簡単なスクリプト
// 実際のプロジェクトでは、適切な効果音ファイルを使用してください

console.log('効果音ファイルを生成中...');

// public/soundsディレクトリが存在することを確認
const soundsDir = path.join(__dirname, '../public/sounds');
if (!fs.existsSync(soundsDir)) {
    fs.mkdirSync(soundsDir, { recursive: true });
}

// ダミーの効果音ファイルを作成（実際のプロジェクトでは適切な音声ファイルを使用）
const spinSoundContent = `# ルーレット回転音（じゃらららら）
# このファイルは実際の音声ファイルに置き換えてください
# 推奨: ルーレット回転音のMP3ファイル`;

const winSoundContent = `# 当選音
# このファイルは実際の音声ファイルに置き換えてください
# 推奨: 当選時のファンファーレ音のMP3ファイル`;

fs.writeFileSync(path.join(soundsDir, 'spin.mp3'), spinSoundContent);
fs.writeFileSync(path.join(soundsDir, 'win.mp3'), winSoundContent);

console.log('効果音ファイルのプレースホルダーを作成しました。');
console.log('実際の音声ファイルに置き換えてください:');
console.log('- public/sounds/spin.mp3 (ルーレット回転音)');
console.log('- public/sounds/win.mp3 (当選音)'); 