// Callback Hell
setTimeout(() => {
  console.log('A');
  setTimeout(() => {
    console.log('B');
    setTimeout(() => {
      console.log('C');
      setTimeout(() => {
        console.log('D');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
