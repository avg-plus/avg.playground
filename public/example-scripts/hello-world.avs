// 显示一个场景
const currentScene = scene.load(0, "demo/room.png");

// 显示一张图片
widget.removeText();
widget.removeImage();
const logo = widget.image("demo/logo.png", {
  position: "(40%, 0%)", // 图片坐标
  size: "(30%,30%)", // 图片尺寸
  animation: {
    // 定义图片动画
    name: "flyin"
  }
});

// 显示立绘
character.show("demo/char-1.png", {
  x: 40,
  y: 50,
  renderer: {
    filter: []
  }
});

// 播放背景音乐
audio.playBGM("demo/living.mp3");

// 显示对话
text.show(["这是对话范例~", "多个连续对话只要放到数组里就可以啦！"], {
  name: "李狗蛋"
});

text.show("那么，我叫你一声，你敢应吗？", {
  name: "李狗蛋"
});

const result = dialog.choices(["有何不敢", "还是别了吧"]);
if (result.selectedIndex === 0) {
  text.show("我敬你是条汉子。", {
    name: "李狗蛋"
  });
} else {
  text.show("你怎么这么怂？", {
    name: "李狗蛋"
  });
}

// 等待鼠标点击后，隐藏对话
text.hide();
