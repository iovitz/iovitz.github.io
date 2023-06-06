const fetchRemoteData = (retryTime = 1) {
  const retry = (err: any)=> {
    if (retryTime > 3) {
      return Promise.reject(err);
    }
    return new Promise((resolve, reject) => {
      setTimeout(
        () => fetchRemoteData().then(resolve, reject), Math.pow(retryTime, 2) * 1000,
      );
    });
  };

  return axios.get('www.baidu.com').then((res) => {

  })
}