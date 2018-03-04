var path = require('path');
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

var gameWebInfoList = [
    {'name': 'EA SPORTS™ FIFA ONLINE 3', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://fifaonline3.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': 'EA SPORTS™ FIFA ONLINE 4', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://fifaonline4.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': 'NEED FOR SPEED™ EDGE', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://needforspeed-edge.nexon.com/main/index', 'isCookie': false, 'getCookie': ''},
    {'name': 'TITANFALL™ ONLINE', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://tfo.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '던전앤파이터', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://df.nexon.com/df/home', 'isCookie': true, 'getCookie': 'skipIntro=1'},
    {'name': '로브레이커즈', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://lawbreakers.nexon.com/Main/Index', 'isCookie': true, 'getCookie': 'LBMV=Y'},
    {'name': '마비노기', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://mabinogi.nexon.com/page/main/index.asp', 'isCookie': true, 'getCookie': 'introMovie=1'},
    {'name': '마비노기듀얼', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://devcat.nexon.com/duel/kr/', 'isCookie': false, 'getCookie': ''},
    {'name': '마비노기영웅전', 'browsers': {'ie8': false, 'ie9': false, 'ie10': true, 'ie11': true, 'edge': false, 'chrome': true, 'firefox': false}, 'url': 'http://heroes.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '메이플스토리1', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://maplestory.nexon.com/MapleStory/Page/Gnx.aspx?URL=home/index', 'isCookie': false, 'getCookie': ''},
    {'name': '메이플스토리2', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://maview.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '바람의나라', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://baram.nexon.com/Home/Index', 'isCookie': false, 'getCookie': ''},
    {'name': '배틀라이트', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://battlerite.nexon.com/', 'isCookie': true, 'getCookie': ' BTRIntro=BTR'},
    {'name': '버블파이터', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://bf.nexon.com/Main/Index', 'isCookie': false, 'getCookie': ''},
    {'name': '서든어택', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://sa.nexon.com/main/index.aspx', 'isCookie': true, 'getCookie': 'SAIntroCheckNX=true, SAIntroTodayNX=true'},
    {'name': '아르피엘', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://arpiel.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '아스가르드', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://asgard.nexon.com/main/page/nx.aspx?url=home/index', 'isCookie': false, 'getCookie': ''},
    {'name': '아스텔리아', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://astellia.nexon.com/main/index', 'isCookie': false, 'getCookie': ''},
    {'name': '어둠의전설', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://lod.nexon.com/main/page/nx.aspx?url=home/index', 'isCookie': false, 'getCookie': ''},
    {'name': '엘소드', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://elsword.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '일랜시아', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://elancia.nexon.com/main/page/nx.aspx?url=home/index', 'isCookie': false, 'getCookie': ''},
    {'name': '천애명월도', 'browsers': {'ie8': false, 'ie9': false, 'ie10': false, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://sky.nexon.com/Main/Index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '카운터스트라이크온라인1', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://csonline.nexon.com/Main/Index', 'isCookie': true, 'getCookie': 'todayChkCSO=true'},
    {'name': '카운터스트라이크온라인2', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://csonline2.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '카트라이더', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://kart.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '크레이지아케이드', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://kart.nexon.com/main/index.aspx', 'isCookie': true, 'getCookie': 'Intro=true'},
    {'name': '클로저스', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://closers.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '탱고파이브 : 더 라스트 댄스', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://t5.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '테라', 'browsers': {'ie8': false, 'ie9': false, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://tera.nexon.com/Main/Index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '테일즈위버', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://tales.nexon.com/tales2/page/gnx.aspx?URL=Home/Index', 'isCookie': false, 'getCookie': ''},
    {'name': '트리 오브 세이비어', 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://tos.nexon.com/main/v2/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '하이퍼유니버스', 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://hu.nexon.com/Main/Index', 'isCookie': false, 'getCookie': ''},
]
var index = 0;

capturingdOroginalImage();
runTestCase();


function runTestCase() {
    describe(setDigits(index + 1, 2) + '. ' + gameWebInfoList[index].name, function() {
        var count = 1;
        var host = '';
        var suiteCount = setDigits(index + 1, 2) + '/' + setDigits(gameWebInfoList.length, 2);;
        var caseCount = '';

        before(function() {
            console.log(suiteCount + ') ' + gameWebInfoList[index].name);
            browser.setViewportSize({width: 800, height: 800});
        });

        beforeEach(function() {
            caseCount = 'TC-' + setDigits(count, 2);
        });
        
        it('[' + caseCount + '] 게임웹 접속', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] 게임웹 접속');
            console.log(suiteCount + ') │\t  ├  기대 결과: ' + gameWebInfoList[index].url);

            navigateToGameWeb(gameWebInfoList[index], browser);

            var url = browser.getUrl();
            var protocolSplits = url.split('//');
            var dotSplits = protocolSplits[1].split('.');
            host = dotSplits[0]; 

            chai.expect(url).to.equal(gameWebInfoList[index].url);
            console.log(suiteCount + ') │\t  ├  실제 결과: ' + url);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] ngm-layer.js 적용', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] ngm-layer.js 적용');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');


            loadedNgmLayer(browser);

            var result = browser.isExisting('head script[src="http://127.0.0.1/moroo/ngm-layer.js"]');
            
            chai.expect('head script[src="http://127.0.0.1/moroo/ngm-layer.js"]').to.be.there();
            console.log(suiteCount + ') │\t  └  실제 결과 : ' + result);
        });

        it('[' + caseCount + '] openNgmLayer() 기능 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] openNgmLayer() 기능 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');

            browser.execute(function() {
                window.NgmLayer.openNgmLayer();
            });
            
            var result = browser.isExisting('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]');

            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').to.be.there();
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] closeNgmLayer() 기능 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] closeNgmLayer() 기능 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');
            
            browser.execute(function() {
                window.NgmLayer.closeNgmLayer();
            });

            var result = browser.isExisting('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]');

            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').not.to.be.there();
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + !result);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] NGM Layer 출력여부 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] NGM Layer 출력여부 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');

            browser.execute(function() {
                window.NgmLayer.openNgmLayer();
            });

            var result = browser.isExisting('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]');

            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').to.be.there();
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });
        
        it('[' + caseCount + '] NGM Layer 출력위치 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] NGM Layer 출력위치 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Left : 125 / Top : 270');
            
            browser.execute(function() {
                var html = document.getElementsByTagName('html')[0];
                html.style.overflowX = 'hidden';
                html.style.overflowY = 'hidden';
            });
            
            var result = checkLocation(browser);
            
            chai.expect(result.positionX).to.equal(125);
            chai.expect(result.positionY).to.equal(270);
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] 창크기 축소 후 NGM Layer 위치 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] 창크기 축소 후 NGM Layer 위치 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Left : 25 / Top : 170');

            browser.setViewportSize({width: 600, height: 600});
            
            var result = checkLocation(browser);
            
            chai.expect(result.positionX).to.equal(25);
            chai.expect(result.positionY).to.equal(170);
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] 창크기 확대 후 NGM Layer 위치 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] 창크기 확대 후 NGM Layer 위치 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Left : 125 / Top : 270');

            browser.setViewportSize({width: 800, height: 800});
            
            var result = checkLocation(browser);
            
            chai.expect(result.positionX).to.equal(125);
            chai.expect(result.positionY).to.equal(270);
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] 스크롤 이동 후 NGM Layer 위치 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] 스크롤 이동 후 NGM Layer 위치 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Left : 125 / Top : 270');

            var size = browser.execute(function() {
                window.scrollTop = document.body.scrollHeight;
                window.scrollLeft = document.body.scrollWidth;

                return {'width': window.scrollLeft, 'height': window.scrollTop};
            });
            
            browser.scroll('body', size.value.width, size.value.height);

            var result = checkLocation(browser);
            
            chai.expect(result.positionX).to.equal(125);
            chai.expect(result.positionY).to.equal(270);
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] NGM 설치하기 버튼 URL 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] NGM 설치하기 버튼 URL 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'http://help.nexon.com/Download/ngm');

            var element = $('div a img[src="https://ssl.nx.com/s2/p3/ngm/bt_ngminstall.gif"]').$('..');

            chai.expect(element.getAttribute('href')).to.equal('http://help.nexon.com/Download/ngm');
            console.log(suiteCount + ') │\t  └  실제 결과 : ' + element.getAttribute('href'));
        });

        it('[' + caseCount + '] NGM 설치하기 버튼 Target 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] NGM 설치하기 버튼 Target 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + '_blank');

            var element = $('div a img[src="https://ssl.nx.com/s2/p3/ngm/bt_ngminstall.gif"]').$('..');

            chai.expect(element.getAttribute('target')).to.equal('_blank');
            console.log(suiteCount + ') │\t  └  실제 결과 : ' + element.getAttribute('target'));
        });

        it('[' + caseCount + '] NGM 설치하기 버튼 클릭 시 새창에서 이동 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] NGM 설치하기 버튼 클릭 시 새창에서 이동 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Tab Count : 2 / url : http://help.nexon.com/Download/ngm');
            
            var element = $('div a img[src="https://ssl.nx.com/s2/p3/ngm/bt_ngminstall.gif"]').$('..');        
            element.click();

            var tabIds = browser.getTabIds();
            var newUrl = browser.switchTab(tabIds[1]).getUrl();

            chai.expect(newUrl).to.equal('http://help.nexon.com/Download/ngm');
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Tab Count : '  + tabIds.length + ' / url : ' + newUrl);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            browser.close();
        });

        it('[' + caseCount + '] 버튼 클릭 후 NGM Layer 삭제 확인', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] NGM Layer 삭제 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');

            var result = browser.isExisting('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]');

            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').not.to.be.there();
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + !result);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });
        
        it('[' + caseCount + '] 시간 설정 후 NGM Layer 삭제 확인(2초)', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] 시간 설정 후 NGM Layer 삭제 확인(2초)');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');

            browser.execute(function() {
                window.NgmLayer.openNgmLayer(2);
            });
            browser.pause(2000);

            var result = browser.isExisting('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]');

            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').not.to.be.there();
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + !result);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] NGM Layer 중복 출력 여부 확인 (5회)', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] NGM Layer 중복 출력 여부 확인 (5회)');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'NGM Layer Count : 1');

            browser.execute(function() {
                window.NgmLayer.openNgmLayer(2);
                window.NgmLayer.openNgmLayer(2);
                window.NgmLayer.openNgmLayer(2);
                window.NgmLayer.openNgmLayer(2);
                window.NgmLayer.openNgmLayer(2);
            });

            var elements = browser.elements('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]');
            
            chai.expect(elements.value.length).to.equal(1);
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'NGM Layer Count : ' + elements.value.length);
        });

        it('[' + caseCount + '] 중복 실행 시 타이머 초기화 여부 확인 (2초 5회)', function() {
            console.log(suiteCount + ') ├  [' + caseCount + '] 중복 실행 시 타이머 초기화 여부 확인 (2초 5회)');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'false');

            browser.pause(2000);

            var result = browser.isExisting('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]');

            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').not.to.be.there();
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });

        it('[' + caseCount + '] 닫기 버튼 클릭 시 NGM Layer 삭제 확인', function() {
            console.log(suiteCount + ') └  [' + caseCount + '] 닫기 버튼 클릭 시 NGM Layer 삭제 확인');
            console.log(suiteCount + ')  \t  ├  기대 결과 : ' + 'true');

            browser.execute(function() {
                window.NgmLayer.openNgmLayer();
            });
            var element = $('div a img[src="https://ssl.nx.com/s2/p3/ngm/bt_close.gif"]').$('..');
            element.click();

            var result = browser.isExisting('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]');

            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').not.to.be.there();
            console.log(suiteCount + ')  \t  ├  실제 결과 : ' + !result);

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ')  \t  └  스샷 저장: ' + filePath);
        });

        afterEach(function() {
            browser.pause(200);
            count++;
        })

        after(function() {
            index++;
            count = 1;

            if (index < 1)
            {
                console.log('Next...');
                runTestCase();
            }
            else
            {
                console.log('Finish!!!');
            }
        })
    });
};

function capturingdOroginalImage() {
    describe('00. 테스트 준비', function() {
        it('원본 NGM Layer 저장하기', function() {
            console.log('init...');
            console.log('원본 NGM Layer 이미지 저장 중...');
            var testHtmlPath = 'file:///' + path.resolve('./src/', 'ngm-test.html');
            
            browser.url(testHtmlPath);
            var buttonElement = $('#moroo-open_button');
            buttonElement.click();
            
            var filePath = path.resolve('./reports/screenshot-results/',  '00_original_NgmLayer.png');
            
            var result = browser.execute(function() {
                var imgElements = document.getElementsByTagName('img');
                var element;
        
                for (var index = 0; index < imgElements.length; index++)
                {
                    if (imgElements[index].getAttribute('src') != null)
                    {
                        if (imgElements[index].getAttribute('src').indexOf('http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif') != -1)
                        {
                            element = imgElements[index].parentNode.parentNode;
                        }
                    }
                }

                return element.options[element.selectedIndex].value;
            });
            console.log(result.value)
            browser.saveElementScreenshot(filePath, result.value);
            console.log('원본 NGM Layer 이미지 저장 완료!!!');
            console.log('Start!!!');
        });
    });
};

function setDigits(number, digits) {
    var zero = '';
    number = number.toString();

    if (number.length < digits)
    {
        for (var i = 0; i < digits - number.length; i++)
        {
            zero += '0';
        }
    }

    return zero + number;
};

function navigateToGameWeb(gameWebInfo, browser) {
    this.browser.url(gameWebInfo.url);
    if (gameWebInfo.isCookie)
    {
        setCookie(gameWebInfo, this.browser);
        this.browser.url(gameWebInfo.url);
    }

    if (this.browser.getUrl() != gameWebInfo.url)
    {
        console.log(this.browser.getUrl());
    }

    var tabs = this.browser.getTabIds();
    
    if (tabs.length > 1)
    {
        for(var i = tabs.length - 1; i == 1; i--)
        {
            this.browser.switchTab(tabs[i]);
            this.browser.close();
        }
    }
};

function setCookie(gameWebInfo, browser) {
    if (gameWebInfo.getCookie != '')
    {
        if (gameWebInfo.getCookie.indexOf(',') != -1)
        {
            var cookies = gameWebInfo.getCookie.split(',');
            for (var i = 0; i < cookies.length; i++)
            {
                var splitCookie = cookies[i].trim().split('=');
                this.browser.setCookie({name: splitCookie[0].trim(), value: splitCookie[1].trim()});
            }
        }
        else
        {
            var splitCookie = gameWebInfo.getCookie.trim().split('=');
            this.browser.setCookie({name: splitCookie[0].trim(), value: splitCookie[1].trim()});
        }
    }
};

function loadedNgmLayer(browser) {
    this.browser.execute(function() {
        var loaded = false;
        var script = window.document.createElement('script');
        script.type= 'text/javascript';
        script.charset = "utf-8";
        
        script.onreadystatechange = function() {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                if (loaded) {
                    return;
                }
                loaded = true;
            }
        }
        script.onload = function() {
            loaded = true;
        }
        script.src = 'http://127.0.0.1/moroo/ngm-layer.js';
        window.document.head.appendChild(script);
    });
}

function checkLocation(browser) {
    var element = this.$('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').$('..').$('..');
    var elementLocation = element.getLocation();
    
    var result = this.browser.execute(function() {
        var left;
        var top;
        var element;
        var imgElements = document.getElementsByTagName('img');
        
        for (var index = 0; index < imgElements.length; index++)
        {
            if (imgElements[index].getAttribute('src') != null)
            {
                if (imgElements[index].getAttribute('src').indexOf('http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif') != -1)
                {
                    element = imgElements[index].parentNode.parentNode;
    
                    left = element.offsetLeft;
                    top = element.offsetTop;
                }
            }
        }
        
        return {'left': left, 'top': top, 'width': window.innerWidth, 'height': window.innerHeight};
    });

    var positionX = result.value.width / 2 - 275;
    var positionY = result.value.height / 2 - 100 - 30;

    if (result.value.left != positionX)
    {
        console.log(result.value.left + ' | ' + positionX);
    }

    if (result.value.top != positionY)
    {
        console.log(result.value.top + ' | ' + positionY);
    }

    return {'positionX': positionX, 'positionY': (positionY)};
}
