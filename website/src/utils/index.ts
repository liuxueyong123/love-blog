export enum GenderList {
  'female' = 1,
  'male' = 2,
}

export enum MyRouterList {
  HomePage = 'HomePage',
  ArticlePage = 'ArticlePage',
  PostPage = 'PostPage',
  AlbumPage = 'AlbumPage',
  LoginPage = 'LoginPage',
}

export const getGreeting = () => {
  const date = new Date();
  const hour = date.getHours();

  if (hour < 5) {
    return 'night';
  } else if (hour < 12) {
    return 'morning';
  } else if (hour < 17) {
    return 'afternoon';
  } else if (hour < 21) {
    return 'evening';
  } else {
    return 'night';
  }
};

export const greeting = getGreeting();
