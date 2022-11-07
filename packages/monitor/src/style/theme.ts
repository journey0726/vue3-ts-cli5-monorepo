import { ConfigProvider } from 'ant-design-vue';

export const changeTheme = (color: string) => {
  ConfigProvider.config({
    theme: {
      primaryColor: color,
    },
  });
  localStorage.setItem('pages-theme', color)
}