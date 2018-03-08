var path = require('path');
// var allure = require('wdio-allure-reporter');
var addContext = require('mochawesome/addContext');
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
];
//var index = 0;
var originalImage;
var originalComputedStyleArray;
var browserType;

//setBrowserMatch();
//initTest();
//runTestCase();

gameWebInfoList.forEach(runTestCase);

function initTest() {
    describe('00. 테스트 준비', function() {
        it('NGM Layer 기본값 저장하기', function() {
            console.log('init...');
            console.log('NGM Layer 기본값 저장 중...');
            // var testHtmlPath = 'file:///' + path.resolve('./src/', 'ngm-test.html');
            console.log(browserName);
            browser.setViewportSize({width: 800, height: 800});
            browser.url('http://127.0.0.1/moroo/ngm-init.html');
            
            // filePath = path.resolve('./reports/screenshot-results/',  '00_original_NgmLayer.png');            
            // originalImage = ngmLayerScreenshot(browser, filePath);
            originalComputedStyleArray = getComputedStyleArray();
            
            console.log('NGM Layer 기본값 저장 완료!!!');
            console.log('Start!!!');
        });
    });
}

function runTestCase(value, index, array) {
/*     if (!gameWebInfoList[browserType])
    {
        describe(setDigits(index + 1, 2) + '. ' + gameWebInfoList[index].name, function() {

        });
        
        return;
    } */
    
    describe(setDigits(index + 1, 2) + '. ' + array[index].name, function() {
        var count = 1;
        var host = '';
        var suiteCount = setDigits(index + 1, 2) + '/' + setDigits(gameWebInfoList.length, 2);;
        var caseCount = '';
        var result;

        before(function() {
            console.log(suiteCount + ') ' + setDigits(index + 1, 2) + '. ' + gameWebInfoList[index].name);
        });

        beforeEach(function() {
            caseCount = 'TC-' + setDigits(count, 2);
        });
        
        it('[TC-01] 게임웹 접속', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] 게임웹 접속');
            console.log(suiteCount + ') │\t  ├  기대 결과: ' + gameWebInfoList[index].url);
            
            //allure.createAttachment(filePath, browser.saveScreenshot(filePath), 'png');

            navigateToGameWeb(gameWebInfoList[index]);

            result = browser.getUrl();
            var protocolSplits = result.split('//');
            var dotSplits = protocolSplits[1].split('.');
            host = dotSplits[0]; 

            console.log(suiteCount + ') │\t  ├  실제 결과: ' + result);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: gameWebInfoList[index].url});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect(result).to.equal(gameWebInfoList[index].url);
        });

        it('[TC-02] ngm-layer.js 적용', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] ngm-layer.js 적용');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');


            loadedNgmLayer();

            result = browser.isExisting('head script[src="http://127.0.0.1/moroo/ngm-layer.js"]');  

            console.log(suiteCount + ') │\t  └  실제 결과 : ' + result);

            addContext(this, {title: '기대 결과', value: true});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect('head script[src="http://127.0.0.1/moroo/ngm-layer.js"]').to.be.there();
        });

        it('[TC-03] openNgmLayer() 기능 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] openNgmLayer() 기능 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');            

            browser.execute(function() {
                window.NgmLayer.openNgmLayer();
            });
            
            result = browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');            

            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: true});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect('div h3 img[src$="txt_ngminstall.gif"]').to.be.there();

        });

        it('[TC-04] closeNgmLayer() 기능 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] closeNgmLayer() 기능 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');            
            
            browser.execute(function() {
                window.NgmLayer.closeNgmLayer();
            });

            result = browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');
            
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + !result);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: true});
            addContext(this, {title: '실제 결과', value: !result});

            chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
        });

        it('[TC-05] NGM Layer UI 확인 (Style 비교 방식)', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] NGM Layer UI 확인 (Style 비교 방식)');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');            

            var currentComputedStyleArray = getComputedStyleArray();
            result = compareStyle(originalComputedStyleArray, currentComputedStyleArray);
            var failsText = '';

            for (var i = 0; i < result.fails.length; i++)
            {
                failsText += 'Style: ' + result.fails[i].name + ' = ' + result.fails[i].original + ' | ' + result.fails[i].current + '\n';
            }

            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result.value);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: true});
            addContext(this, {title: '실제 결과', value: result.value});

            if (!result.value)
            {
                addContext(this, {title: 'Not Equal Style', value: failsText});
            }

            chai.expect(result.value, failsText).to.be.true;
        });
        /*       
        it('[TC-05] NGM Layer UI 확인 (Image 비교 방식)', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] NGM Layer UI 확인 (Image 비교 방식)');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');

            var filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            var image = ngmLayerScreenshot(browser, filePath);
            var result = false;

            if (image === originalImage)
            {
                result = true;
            }
            else
            {
                result = false;
            }

            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result);
            chai.expect(result).to.be.true;

            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
        });
        */        
        it('[TC-06] NGM Layer 출력위치 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] NGM Layer 출력위치 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Left : 125 / Top : 270');            
            
            browser.execute(function() {
                document.documentElement.style.overflowX = 'hidden';
                document.documentElement.style.overflowY = 'hidden';

                window.NgmLayer.closeNgmLayer();
                window.NgmLayer.openNgmLayer();
            });
            
            result = checkLocation();
            
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: 'Left : 125 / Top : 270'});
            addContext(this, {title: '실제 결과', value: 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY});

            chai.expect(result.positionX).to.equal(125);
            chai.expect(result.positionY).to.equal(270);
        });

        it('[TC-07] 창크기 축소 후 NGM Layer 위치 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] 창크기 축소 후 NGM Layer 위치 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Left : 25 / Top : 170');            

            browser.setViewportSize({width: 600, height: 600});
            
            result = checkLocation();
            
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: 'Left : 25 / Top : 170'});
            addContext(this, {title: '실제 결과', value: 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY});

            chai.expect(result.positionX).to.equal(25);
            chai.expect(result.positionY).to.equal(170);
        });

        it('[TC-08] 창크기 확대 후 NGM Layer 위치 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] 창크기 확대 후 NGM Layer 위치 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Left : 125 / Top : 270');            

            browser.setViewportSize({width: 800, height: 800});
            
            result = checkLocation();
            
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: 'Left : 125 / Top : 270'});
            addContext(this, {title: '실제 결과', value: 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY});

            chai.expect(result.positionX).to.equal(125);
            chai.expect(result.positionY).to.equal(270);
        });

        it('[TC-09] 스크롤 이동 후 NGM Layer 위치 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] 스크롤 이동 후 NGM Layer 위치 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Left : 125 / Top : 270');            

            var size = browser.execute(function() {
                window.scrollTop = document.body.scrollHeight;
                window.scrollLeft = document.body.scrollWidth;

                return {'width': window.scrollLeft, 'height': window.scrollTop};
            });
            
            browser.scroll('body', size.value.width, size.value.height);

            result = checkLocation();
            
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: 'Left : 125 / Top : 270'});
            addContext(this, {title: '실제 결과', value: 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY});

            chai.expect(result.positionX).to.equal(125);
            chai.expect(result.positionY).to.equal(270);
        });

        it('[TC-10] NGM 설치하기 버튼 URL 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] NGM 설치하기 버튼 URL 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'http://help.nexon.com/Download/ngm');

            var element = $('div a img[src$="bt_ngminstall.gif"]').$('..');
            result = element.getAttribute('href');

            console.log(suiteCount + ') │\t  └  실제 결과 : ' + result);

            addContext(this, {title: '기대 결과', value: 'http://help.nexon.com/Download/ngm'});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect(element.getAttribute('href')).to.equal('http://help.nexon.com/Download/ngm');
        });

        it('[TC-11] NGM 설치하기 버튼 Target 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] NGM 설치하기 버튼 Target 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + '_blank');

            var element = $('div a img[src$="bt_ngminstall.gif"]').$('..');
            result = element.getAttribute('target');

            console.log(suiteCount + ') │\t  └  실제 결과 : ' + result);

            addContext(this, {title: '기대 결과', value: '_blank'});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect(result).to.equal('_blank');
        });

        it('[TC-12] NGM 설치하기 버튼 클릭 시 새창에서 이동 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] NGM 설치하기 버튼 클릭 시 새창에서 이동 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'Tab Count : 2 / url : http://help.nexon.com/Download/ngm');
            
            var element = $('div a img[src$="bt_ngminstall.gif"]').$('..');        
            element.click();

            var tabIds = browser.getTabIds();
            result = {};
            result.tabCount = tabIds.length;

            browser.switchTab(tabIds[1]);
            result.url = browser.getUrl();

            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'Tab Count : '  + result.tabCount + ' / url : ' + result.url);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);
            browser.close();

            addContext(this, {title: '기대 결과', value: 'Tab Count : 2 / url : http://help.nexon.com/Download/ngm'});
            addContext(this, {title: '실제 결과', value: 'Tab Count : '  + result.tabCount + ' / url : ' + result.url});

            chai.expect(result.url).to.equal('http://help.nexon.com/Download/ngm');
        });

        it('[TC-13] 버튼 클릭 후 NGM Layer 삭제 확인', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] NGM Layer 삭제 확인');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');            

            result = !browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');

            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: true});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
        });
        
        it('[TC-14] 시간 설정 후 NGM Layer 삭제 확인(2초)', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] 시간 설정 후 NGM Layer 삭제 확인(2초)');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'true');            

            browser.execute(function() {
                window.NgmLayer.openNgmLayer(2);
            });
            browser.pause(2000);

            result = !browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');

            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: true});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
        });

        it('[TC-15] NGM Layer 중복 출력 여부 확인 (5회)', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] NGM Layer 중복 출력 여부 확인 (5회)');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'NGM Layer Count : 1');

            browser.execute(function() {
                window.NgmLayer.openNgmLayer(2);
                window.NgmLayer.openNgmLayer(2);
                window.NgmLayer.openNgmLayer(2);
                window.NgmLayer.openNgmLayer(2);
                window.NgmLayer.openNgmLayer(2);
            });

            var elements = browser.elements('div h3 img[src$="txt_ngminstall.gif"]');
            result = elements.value.length;
            
            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + 'NGM Layer Count : ' + result);

            addContext(this, {title: '기대 결과', value: 1});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect('div h3 img[src$="txt_ngminstall.gif"]').to.have.count(1);
        });

        it('[TC-16] 중복 실행 시 타이머 초기화 여부 확인 (2초 5회)', function() {
            console.log(suiteCount + ') ├ [' + caseCount + '] 중복 실행 시 타이머 초기화 여부 확인 (2초 5회)');
            console.log(suiteCount + ') │\t  ├  기대 결과 : ' + 'false');            

            browser.pause(2000);

            result = browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');

            console.log(suiteCount + ') │\t  ├  실제 결과 : ' + result);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ') │\t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: false});
            addContext(this, {title: '실제 결과', value: result});

            chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
        });

        it('[TC-17] 닫기 버튼 클릭 시 NGM Layer 삭제 확인', function() {
            console.log(suiteCount + ') └ [' + caseCount + '] 닫기 버튼 클릭 시 NGM Layer 삭제 확인');
            console.log(suiteCount + ')  \t  ├  기대 결과 : ' + 'true');            

            browser.execute(function() {
                window.NgmLayer.openNgmLayer();
            });

            var element = $('div a img[src$="bt_close.gif"]').$('..');
            element.click();

            result = !browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');

            console.log(suiteCount + ')  \t  ├  실제 결과 : ' + result);
            filePath = path.resolve('./reports/screenshot-results/',  setDigits(index + 1, 2) + '_' + host + '_TC-' + setDigits(count, 2) + '.png');
            browser.saveScreenshot(filePath);
            console.log(suiteCount + ')  \t  └  스샷 저장: ' + filePath);

            addContext(this, {title: '기대 결과', value: false});
            addContext(this, {title: '실제 결과', value: !result});

            chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
        });

        afterEach(function() {
            browser.pause(100);
            count++;
        });

        after(function() {
            index++;
            count = 1;

            if (index < 2)
            {
                console.log('Next...');
                //runTestCase();
            }
            else
            {
                console.log('Finish!!!');
            }
        });
    });
}

function setBrowserMatch() {
    switch(browser.desiredCapabilities.browserName)
    {
        case 'chrome':
        {
            browserType = 'chrome';
            break;
        }
        case 'internet explorer':
        {
            browserType = 'ie' + browser.desiredCapabilities.version;
            break;
        }
        case 'firefox':
        {
            browserType = 'firefox';
            break;
        }
        case 'MicrosoftEdge':
        {
            browserType = 'edge';
            break;
        }
    }
}
function compareStyle(original, current) {
    var failList = [];
    var value = true;
    var result;

    if (original == current)
    {
        result = {'value': value, 'fails': ''};
    }
    else
    {
        for (var i = 0; i < original.length; i++)
        {
            var obj = compareObject(original[i], current[i], i);
            value = obj.value;
            if (obj.fails != '')
            {
                failList.push(obj.fails);
            }
        }
        
        result = {'value': value, 'fails': failList};
    }

    return result;
}

function compareObject(original, current, index) {
    index++;
    var value = true;
    var result;

    if (original === current)
    {
        //chai.expect(original).to.equal(current);
        result = {'value': true, 'fails': ''};
        return result;
    }
    
    if (!(original instanceof Object) || !(current instanceof Object))
    {
        console.log('[ERROR]│\t  ├  ' + setDigits(index,2) + ') ' + original + ' | ' + current);
        result = {'value': false, 'fails': ''};
        return result;
     }
     // if they are not strictly equal, they both need to be Objects
     if (original.constructor !== current.constructor)
     {
        console.log('[ERROR]│\t  ├  ' + setDigits(index,2) + ') ' + original + ' | ' + current);
        result = {'value': false, 'fails': ''};
        return result;
     }
     // they must have the exact same prototype chain, the closest we can do is
     // test there constructor.

    for (var p in original)
    {
        if (!original.hasOwnProperty(p))
        {
            continue;
        }

        // chai.expect(current.hasOwnProperty(p), p).to.be.true;
        if (!current.hasOwnProperty(p))
        {
            console.log('[ERROR]│\t  ├  ' + setDigits(index,2) + ') Name: ' + p + ' | Original: ' + original[p] + ' | Current: ' + current[p]);
            result = {'value': false, 'fails': {'name': p, 'original': original[p], 'current': current[p]}};
            //chai.expect(current).to.have.ownPropertyDescriptor(p);
            return result;
        }

        // chai.expect(original[p], p).to.equal(current[p]);
        if (original[p] != current[p])
        {
            console.log('[ERROR]│\t  ├  ' + setDigits(index,2) + ') Name: ' + p + ' | Original: ' + original[p] + ' | Current: ' + current[p]);
            result = {'value': false, 'fails': {'name': p, 'original': original[p], 'current': current[p]}};
            //chai.expect(original[p], p).to.equal(current[p]);
            return result;
        }
    }
    for (p in current)
    {
        // chai.expect(current.hasOwnProperty(p), p).to.equal(original.hasOwnProperty(p));
        if (current.hasOwnProperty(p) && !original.hasOwnProperty(p))
        {
            console.log('[ERROR]│\t  ├  ' + setDigits(index,2) + ') Name: ' + p + ' | Original: ' + original[p] + ' | Current: ' + current[p]);
            result = {'value': false, 'fails': {'name': p, 'original': original[p], 'current': current[p]}};
            //chai.expect(original).to.have.ownPropertyDescriptor(p);
            return result;
        }
    }

    result = {'value': true, 'fails': ''};
    return result;
}

function getComputedStyleArray() {
    var result = browser.execute(function() {
        document.documentElement.style.overflowX = 'hidden';
        document.documentElement.style.overflowY = 'hidden';
        
        if (typeof window.NgmLayer == 'object')
        {
            window.NgmLayer.openNgmLayer();
        }
        else
        {
            window.openNgmLayer();
        }
        
        var element = document.querySelector('div h3 img[src$="txt_ngminstall.gif"]').parentNode.parentNode;

        var computedStyleArray = createComputedStyleArray(element, new Array());

        function createComputedStyleArray(element, array) {
            array.push(setValueForComputedStyle(element));

            if (element.childNodes.length > 0)
            {
                for (var i = 0; i < element.childNodes.length; i++)
                {
                    createComputedStyleArray(element.childNodes[i], array);
                }
            }

            return array;
        }

        function setValueForComputedStyle(element) {
            var computedStyleObject = {};

            if (element.nodeType == 1)
            {
                var styleNames = window.getComputedStyle(element, null);
                
                for (var i = 0; i < styleNames.length; i++)
                {
                    computedStyleObject[styleNames[i]] = window.getComputedStyle(element, null).getPropertyValue(styleNames[i]);
                }
            }
            
            return computedStyleObject;
        }
        
        return computedStyleArray;
    });
    
    return result.value;
}

function ngmLayerScreenshot(filePath) {
    browser.execute(function() {
        if (typeof window.NgmLayer == 'function')
        {
            window.NgmLayer.openNgmLayer();
        }
        else
        {
            window.openNgmLayer();
        }
    });

    browser.setViewportSize({width: 550, height: 200});

    browser.execute(function() {
        document.documentElement.style.overflowX = 'hidden';
        document.documentElement.style.overflowY = 'hidden';


        var element = document.querySelector('div h3 img[src$="txt_ngminstall.gif"]').parentNode.parentNode;
        element.style.marginTop = '-100px';
    });
    
    //browser.pause(3000);
    // var image = browser.saveElementScreenshot(filePath, '#moroo-NgmLayer');
    var image = browser.saveScreenshot(filePath);

    //browser.parentNode(500);
    browser.execute(function() {
        window.NgmLayer.closeNgmLayer();
    });

    browser.setViewportSize({width: 800, height: 800});

    return image;
}

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
}

function navigateToGameWeb(gameWebInfo) {
    browser.url(gameWebInfo.url);
    if (gameWebInfo.isCookie)
    {
        setCookie(gameWebInfo);
        browser.url(gameWebInfo.url);
    }

    if (browser.getUrl() != gameWebInfo.url)
    {
        console.log(browser.getUrl());
    }

    var tabs = browser.getTabIds();
    
    if (tabs.length > 1)
    {
        for(var i = tabs.length - 1; i == 1; i--)
        {
            browser.switchTab(tabs[i]);
            browser.close();
        }
    }
}

function setCookie(gameWebInfo) {
    if (gameWebInfo.getCookie != '')
    {
        var splitCookie;
        if (gameWebInfo.getCookie.indexOf(',') != -1)
        {
            var cookies = gameWebInfo.getCookie.split(',');
            for (var i = 0; i < cookies.length; i++)
            {
                splitCookie = cookies[i].trim().split('=');
                browser.setCookie({name: splitCookie[0].trim(), value: splitCookie[1].trim()});
            }
        }
        else
        {
            splitCookie = gameWebInfo.getCookie.trim().split('=');
            browser.setCookie({name: splitCookie[0].trim(), value: splitCookie[1].trim()});
        }
    }
}

function loadedNgmLayer() {
    browser.execute(function() {
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

function checkLocation() {
    var element = $('div h3 img[src$="txt_ngminstall.gif"]').$('..').$('..');
    var elementLocation = element.getLocation();
    
    var result = browser.execute(function() {
        var left;
        var top;
        var element = document.querySelector('div h3 img[src$="txt_ngminstall.gif"]').parentNode.parentNode;
        left = element.offsetLeft;
        top = element.offsetTop;
        
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
