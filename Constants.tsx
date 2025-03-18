export const BG_COLOR = 'white';
export const BTN_COLOR = '#4c4dc7';
export const INPUT_BG_COLOR = '#f3f3f3';
export const TOP_BAR_COLOR = '#7480f0';
export const TAB_PRESS_ACTIVE_WHITE_COLOR = '#4d565d';
export const CHAT_BACKROUND_COLOR = '#fff';
export const CHAT_HEIGHT = 90;
export const TITLE_COLOR = 'white';
export const MESSAGE_BLUE_COLOR = '#00ffff38';

export const getRoomId = (user1: string | undefined, user2: string) => {
  const sortedids = [user1, user2].sort(); // sorting the ids first
  const roomid = sortedids.join('-'); // then joining the both ids by -
  return roomid;
};

export const formatDate = (date: Date) => {
  const currentDate = date.getDate();
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentMonth = months[date.getMonth()];

  return currentDate + ' ' + currentMonth;
};
