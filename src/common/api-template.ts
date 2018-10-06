import { IconNames } from '@blueprintjs/icons';
import { parseTemplate } from './api-template.support';

export const APITemplate = [
  {
    class: '文本',
    icon : IconNames.BOOK,
    apis : [
      {
        name    : '显示对话',
        template: parseTemplate('text.show("%{cs}输入新的对话%{ce}");'),
      },
    ],
  },
  {
    class: '音效',
    icon : IconNames.MUSIC,
    apis : [
      {
        name    : 'PlayBGM',
        template: parseTemplate(`audio.playBGM("%{cs}http://example.com/music.mp3%{ce}");`),
      },
    ],
  },
];
