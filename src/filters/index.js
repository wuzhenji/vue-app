export function getTimeDiff(date) {
    let dateTimeStamp = new Date(date)
    let result = ''
    let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime(); //获取当前时间毫秒
    let diffValue = now - dateTimeStamp; //时间差

    if (diffValue < 0) {
        return;
    }
    let minC = diffValue / minute; //计算时间差的分，时，天，周，月
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前";
    } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC) + "周前";
    } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前";
    } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前";
    } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前";
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚";
    } else {
        let datetime = new Date();
        datetime.setTime(dateTimeStamp);
        let Nyear = datetime.getFullYear();
        let Nmonth =
            datetime.getMonth() + 1 < 10 ?
                "0" + (datetime.getMonth() + 1) :
                datetime.getMonth() + 1;
        let Ndate =
            datetime.getDate() < 10 ?
                "0" + datetime.getDate() :
                datetime.getDate();
        let Nhour =
            datetime.getHours() < 10 ?
                "0" + datetime.getHours() :
                datetime.getHours();
        let Nminute =
            datetime.getMinutes() < 10 ?
                "0" + datetime.getMinutes() :
                datetime.getMinutes();
        let Nsecond =
            datetime.getSeconds() < 10 ?
                "0" + datetime.getSeconds() :
                datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate;
    }
    return result;
}

export function getRunTime(date) {
    let s1 = new Date(date);
    let s2 = new Date();
    let runTime = parseInt((s2.getTime() - s1.getTime()) / 1000);
    // let year = Math.floor(runTime / 86400 / 365);
    // runTime = runTime % (86400 * 365);
    // let month = Math.floor(runTime / 86400 / 30);
    // runTime = runTime % (86400 * 30);
    let day = Math.floor(runTime / 86400);
    runTime = runTime % 86400;
    let hour = Math.floor(runTime / 3600);
    runTime = runTime % 3600;
    let minute = Math.floor(runTime / 60);
    runTime = runTime % 60;
    let second = runTime;
    return `${day}天${hour}小时${minute}分钟${second}秒`
}

export function galleryImgFilter(url) {
    return `http://123.57.211.30:3000/file/${url}`
}