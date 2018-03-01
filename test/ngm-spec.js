describe(gameWebInfoList[index].name, function() {
    it('게임웹 접속' + gameWebInfoList[index].name, function() {
        navigateToGameWeb(gameWebInfoList[index], browser);
        console.log(index + '/ ' + gameWebInfoList.length + ') start');
        expect(browser.getUrl()).toEqual(gameWebInfoList[index].url);
    });

    it('openNgmLayer() 실행', function() {
        runOpenNgmLayer(browser);
        browser.pause(2000);
    });
});