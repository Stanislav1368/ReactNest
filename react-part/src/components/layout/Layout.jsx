import React from 'react'

// const Layout = ({children}) => {
//   const styles = {
//     backgroundImage: 'url(https://catherineasquithgallery.com/uploads/posts/2021-02/1614262828_66-p-chernaya-kartinka-bez-fona-89.jpg)',
//     backgroundSize: 'cover', // чтобы изображение занимало всю площадь фона
//     backgroundRepeat: 'no-repeat', // чтобы изображение не повторялось
//     backgroundPosition: 'center', // чтобы изображение было центрировано
//   };

//   return (
//     <div style={styles}>{children}</div>
//   );
// }


// export default Layout;
const Layout = ({children}) => {
    const styles = {
        backgroundImage: 'linear-gradient(#2d48be, #ad2dbe)'
      };
  return (
    <div style={styles}>{children}</div>
  )
}

export default Layout
