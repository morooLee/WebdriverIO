var path = require('path');
// var allure = require('wdio-allure-reporter');
var addContext = require('mochawesome/addContext');
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

var xlsx = require('xlsx');
var fs = require('fs');
var PNG = require('pngjs').PNG;
var pixelmatch = require('pixelmatch');
// var imagediff = require('imagediff');
// var Cavas = require('canvas');

var gameWebInfoList = [
    {'name': 'EA SPORTS™ FIFA ONLINE 3', 'shotName': 'fifa3', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://fifaonline3.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': 'EA SPORTS™ FIFA ONLINE 4', 'shotName': 'fifa4', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://fifaonline4.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': 'NEED FOR SPEED™ EDGE', 'shotName': 'nfs', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://needforspeed-edge.nexon.com/main/index', 'isCookie': false, 'getCookie': ''},
    {'name': 'TITANFALL™ ONLINE', 'shotName': 'titanfall', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://tfo.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '던전앤파이터', 'shotName': 'df', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://df.nexon.com/df/home', 'isCookie': true, 'getCookie': 'skipIntro=1'},
    {'name': '로브레이커즈', 'shotName': 'lb', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://lawbreakers.nexon.com/Main/Index', 'isCookie': true, 'getCookie': 'LBMV=Y'},
    {'name': '마비노기', 'shotName': 'mabinogi', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://mabinogi.nexon.com/page/main/index.asp', 'isCookie': true, 'getCookie': 'introMovie=1; path=/;'},
    {'name': '마비노기듀얼', 'shotName': 'devcatdual', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://devcat.nexon.com/duel/kr/', 'isCookie': false, 'getCookie': ''},
    {'name': '마비노기영웅전', 'shotName': 'heros', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': false, 'ie10': true, 'ie11': true, 'edge': false, 'chrome': true, 'firefox': false}, 'url': 'http://heroes.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '메이플스토리1(home)', 'shotName': 'maple1(home)', 'isDocModeIE7': true, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://maplestory.nexon.com/MapleStory/Page/Gnx.aspx?URL=home/index', 'isCookie': false, 'getCookie': ''},
    {'name': '메이플스토리1(Optimize)', 'shotName': 'maple1(optimize)', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://maplestory.nexon.com/MapleStory/Page/Optimize.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '메이플스토리2(maplestory2)', 'shotName': 'maple2(home)', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://maplestory2.nexon.com/home/20180222/all', 'isCookie': true, 'getCookie': 'HideIntroEvent=Y'},
    {'name': '메이플스토리2(maview)', 'shotName': 'maple2(maview)', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://maview.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '바람의나라', 'shotName': 'baram', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://baram.nexon.com/Home/Index', 'isCookie': false, 'getCookie': ''},
    {'name': '배틀라이트', 'shotName': 'battlerite', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://battlerite.nexon.com/Main/Index', 'isCookie': true, 'getCookie': 'BTRIntro=BTR'},
    {'name': '버블파이터', 'shotName': 'bf', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://bf.nexon.com/Main/Index', 'isCookie': false, 'getCookie': ''},
    {'name': '서든어택', 'shotName': 'sa', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://sa.nexon.com/main/index.aspx', 'isCookie': true, 'getCookie': 'SAIntroCheckNX=true, SAIntroTodayNX=true'},
    {'name': '아르피엘', 'shotName': 'arpiel', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://arpiel.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '아스가르드', 'shotName': 'asgard', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://asgard.nexon.com/main/page/nx.aspx?url=home/index', 'isCookie': false, 'getCookie': ''},
    {'name': '아스텔리아', 'shotName': 'astellia', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://astellia.nexon.com/main/index', 'isCookie': true, 'getCookie': 'Hide180315Video=Y'},
    {'name': '어둠의전설', 'shotName': 'lod', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://lod.nexon.com/main/page/nx.aspx?url=home/index', 'isCookie': false, 'getCookie': ''},
    {'name': '엘소드', 'shotName': 'elsword', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://elsword.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '일랜시아', 'shotName': 'elancia', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://elancia.nexon.com/main/page/nx.aspx?url=home/index', 'isCookie': false, 'getCookie': ''},
    {'name': '천애명월도', 'shotName': 'sky', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': false, 'ie10': false, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://sky.nexon.com/Main/Index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '카운터스트라이크온라인1', 'shotName': 'cso1', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://csonline.nexon.com/Main/Index', 'isCookie': true, 'getCookie': 'todayChkCSO=true'},
    {'name': '카운터스트라이크온라인2', 'shotName': 'cso2', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://csonline2.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '카트라이더', 'shotName': 'kart', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://kart.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '크레이지아케이드', 'shotName': 'crazy', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://ca.nexon.com/Home/Index', 'isCookie': true, 'getCookie': 'Intro=true'},
    {'name': '클로저스', 'shotName': 'closers', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://closers.nexon.com/main/index.aspx', 'isCookie': true, 'getCookie': 'teaser180308=done'},
    {'name': '탱고파이브 : 더 라스트 댄스', 'shotName': 't5', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://t5.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '테라', 'shotName': 't5', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': false, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://tera.nexon.com/Main/Index.aspx', 'isCookie': false, 'getCookie': ''},
    {'name': '테일즈위버', 'shotName': 'tales', 'isDocModeIE7': true, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://tales.nexon.com/tales2/page/gnx.aspx?URL=Home/Index', 'isCookie': false, 'getCookie': ''},
    {'name': '트리 오브 세이비어', 'shotName': 'tos', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://tos.nexon.com/main/v2/index.aspx', 'isCookie': true, 'getCookie': '167772186_141=done'},
    {'name': '하이퍼유니버스', 'shotName': 'hu', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://hu.nexon.com/Main/Index', 'isCookie': false, 'getCookie': ''},
];

var gameWebInfoList2 = [
    // {'name': 'EA SPORTS™ FIFA ONLINE 3', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://fifaonline3.nexon.com/main/index.aspx', 'isCookie': false, 'getCookie': ''},
    // {'name': 'EA SPORTS™ FIFA ONLINE 4', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://fifaonline4.nexon.com/', 'isCookie': false, 'getCookie': ''},
    // {'name': '메이플스토리2(maplestory2)', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://maplestory2.nexon.com/home/20180222/all', 'isCookie': true, 'getCookie': 'HideIntroEvent=Y'},
    // {'name': '클로저스', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://closers.nexon.com/main/index.aspx', 'isCookie': true, 'getCookie': 'teaser180308=done'},
    // {'name': '아스텔리아', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://astellia.nexon.com/main/index', 'isCookie': true, 'getCookie': 'Hide180315Video=Y'},
    // {'name': '던전앤파이터', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://df.nexon.com/df/home', 'isCookie': true, 'getCookie': 'skipIntro=1'},
    // {'name': '메이플스토리1', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://maplestory.nexon.com/MapleStory/Page/Optimize.aspx', 'isCookie': false, 'getCookie': ''},
    // {'name': '테일즈위버', 'isDocModeIE7': true, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://tales.nexon.com/tales2/page/gnx.aspx?URL=Home/Index', 'isCookie': false, 'getCookie': ''},
    // {'name': 'NEED FOR SPEED™ EDGE', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://needforspeed-edge.nexon.com/main/index', 'isCookie': false, 'getCookie': ''},
    // {'name': 'TITANFALL™ ONLINE', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://tfo.nexon.com/', 'isCookie': false, 'getCookie': ''},
    // {'name': '마비노기', 'isDocModeIE7': false, 'browsers': {'ie8': false, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': false}, 'url': 'http://mabinogi.nexon.com/page/main/index.asp', 'isCookie': true, 'getCookie': 'introMovie=1; path=/;'},
    // {'name': '카운터스트라이크온라인2', 'shotName': 'cso2', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://csonline2.nexon.com/', 'isCookie': false, 'getCookie': ''},
    {'name': '카운터스트라이크온라인1', 'shotName': 'cso1', 'isDocModeIE7': false, 'browsers': {'ie8': true, 'ie9': true, 'ie10': true, 'ie11': true, 'edge': true, 'chrome': true, 'firefox': true}, 'url': 'http://csonline.nexon.com/Main/Index', 'isCookie': true, 'getCookie': 'todayChkCSO=true'},
];
//var index = 0;
var BasicImagePath;
var basicComputedStyleArray;
var browserType;
var host;
var suiteCount;
var caseCount;
var result;
var filePath;
var BasicImageName;
var screenShotPath;
var screenShotName;
var isDocModeIE7;
//setBrowserMatch();
//initTest();
//runTestCase();
setBrowserInfo();

describe('NGM Layer Test', function() {
    setBrowserInfo();
    initTest();
    gameWebInfoList.forEach(runTestCase);
});


function initTest() {
    describe('00. 테스트 준비', function() {
        it('기본 NGM Layer 설정', function() {
            console.log('init...');
            console.log('NGM Layer 기본 스타일 저장 중...');
            // var testHtmlPath = 'file:///' + path.resolve('./src/', 'ngm-test.html');
            
            // browser.desiredCapabilities.unexpectedAlertBehaviour = 'accept';
            
            browser.setViewportSize({width: 800, height: 800});
            browser.url('http://127.0.0.1/moroo/ngm-init.html');
            
            setBrowserInfo();

            screenShotPath = './reports/screenshot-result/' + browserType + '/';
            screenShotName = '00_original_NgmLayer_' + browserType + '.png';
            BasicImageName = screenShotName;

            try {
                fs.mkdirSync(screenShotPath);
            }
            catch(e) {
                if ( e.code != 'EEXIST' ) throw e;
            }

            filePath = path.resolve(screenShotPath, screenShotName);
            
            basicComputedStyleArray = getComputedStyleArray();
            
            console.log('NGM Layer 기본 스타일 저장 완료!!!');

            console.log('NGM Layer 기본 이미지 저장 중...');
            BasicImagePath = filePath;
            ngmLayerScreenshot(filePath);

            addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
            console.log('NGM Layer 기본 이미지 저장 완료!!!');
            console.log('Start!!!');
        });
    });
}

function runTestCase(value, index, array) {
    var count = 1;

    if (browserType.indexOf('ie') > -1 && value.isDocModeIE7)
    {
        describe.skip(setDigits(index + 1, 2) + '. ' + value.name, function() {
            before(function() {
                count = 1;
                suiteCount = setDigits(index + 1, 2) + '/' + setDigits(array.length, 2);
                console.log(suiteCount + ') ' + setDigits(index + 1, 2) + '. ' + value.name);
            });
            it('게임웹의 문서모드가 IE=7로 설정되어 있어서 테스트 제외함', function() {
                console.log(suiteCount + ') └   게임웹의 문서모드가 IE=7로 설정되어 있어서 테스트 제외함');
            });
        });
    }
    else if (value.browsers[browserType])
    {
        describe(setDigits(index + 1, 2) + '. ' + value.name, function() {
            before(function() {
                count = 1;
                suiteCount = setDigits(index + 1, 2) + '/' + setDigits(array.length, 2);
                console.log(suiteCount + ') ' + setDigits(index + 1, 2) + '. ' + value.name);
            });
        
            beforeEach(function() {
                caseCount = '[TC-' + setDigits(count, 2) + ']';
                screenShotPath = './reports/screenshot-result/' + browserType + '/';
                screenShotName = setDigits(index + 1, 2) + '_' + value.shotName + '_TC-' + setDigits(count, 2) + '_' + browserType + '.png';
                filePath = path.resolve(screenShotPath, screenShotName); 
            });
            
            // 01
            it('[TC-01] 게임웹 접속', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' 게임웹 접속');
                console.log(suiteCount + ') │\t ├  기대 결과: ' + value.url);
                
                //allure.createAttachment(filePath, browser.saveScreenshot(filePath), 'png');
                // browser.setViewportSize({width: 800, height: 800});
                
                host = setHost(value.url);
                
                navigateToGameWeb(value);
                
                result = browser.getUrl();

                screenShotPath = './reports/screenshot-result/' + browserType + '/';
                screenShotName = setDigits(index + 1, 2) + '_' + value.shotName + '_TC-' + setDigits(count, 2) + '_' + browserType + '.png';
                filePath = path.resolve(screenShotPath, screenShotName); 

                console.log(suiteCount + ') │\t └  실제 결과: ' + result);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                addContext(this, {title: '기대 결과', value: value.url});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect(result).to.equal(value.url);
            });
            // 02
            it('[TC-02] ngm-layer.min.js 적용', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' ngm-layer.min.js 적용');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'true');


                loadedNgmLayer();

                result = browser.waitForExist ('head script[src="http://127.0.0.1/moroo/ngm-layer.min.js"]', 5000);

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result);

                addContext(this, {title: '기대 결과', value: true});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect('head script[src="http://127.0.0.1/moroo/ngm-layer.min.js"]').to.be.there();
            });
            // 03
            it('[TC-03] openNgmLayer() 기능 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' openNgmLayer() 기능 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'true');            

                browser.execute(function() {
                    window.NgmLayer.openNgmLayer();
                });
                
                result = browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');            

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: true});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect('div h3 img[src$="txt_ngminstall.gif"]').to.be.there();

            });
            // 04
            it('[TC-04] closeNgmLayer() 기능 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' closeNgmLayer() 기능 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'true');            
                
                browser.execute(function() {
                    window.NgmLayer.closeNgmLayer();
                });

                result = !browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');
                
                console.log(suiteCount + ') │\t └  실제 결과 : ' + result);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: true});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
            });
            // 05
            it('[TC-05] z-index 10000000 이상인 엘리먼트 검색', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' z-index 10000000 이상인 엘리먼트 검색');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + '0');            

                var result = getDocumentComputedStyle();

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result.length);

                addContext(this, {title: '기대 결과', value: 0});
                addContext(this, {title: '실제 결과', value: result.length});

                if (result.length >= 1)
                {
                    var failes = '';

                    for (var i = 0; i < result.length; i++)
                    {
                        console.log(suiteCount + ') │\t  { tagName: ' + result[i].tagName + ', id: ' + result[i].id + ', class: ' + result[i].class + ', z-index: ' + result[i]['z-index'] + ' }');
                        failes += '{\n';
                        failes += '    tagName: ' + result[i].tagName + ',\n';
                        failes += '    id: ' + result[i].id + ',\n';
                        failes += '    class: ' + result[i].class + ',\n';
                        failes += '    z-index: ' + result[i]['z-index'] + ',\n';
                        failes += '}\n';
                    }
                    addContext(this, {title: 'Z-Index is more than 10000000', value: failes});
                }

                chai.expect(result).to.have.lengthOf(0);
            });
            // 05
        /*
            it('[TC-' + setDigits(count++, 2) + '] NGM Layer UI 확인 (Style 비교 방식)', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' NGM Layer UI 확인 (Style 비교 방식)');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'true');            

                var currentComputedStyleArray = getComputedStyleArray();
                result = compareStyle(originalComputedStyleArray, currentComputedStyleArray);
                var failsText = '';

                for (var i = 0; i < result.fails.length; i++)
                {
                    failsText += 'Style: ' + result.fails[i].name + ' = ' + result.fails[i].original + ' | ' + result.fails[i].current + '\n';
                }

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result.value);
                browser.saveScreenshot(filePath);
                console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                addContext(this, {title: '기대 결과', value: true});
                addContext(this, {title: '실제 결과', value: result.value});

                if (!result.value)
                {
                    addContext(this, {title: 'Not Equal Style', value: failsText});
                }

                chai.expect(result.value, failsText).to.be.true;
            });
        */
            // 06
            it('[TC-06] NGM Layer UI 확인 (Image 비교 방식)', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' NGM Layer UI 확인 (Image 비교 방식)');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + '0');

                ngmLayerScreenshot(filePath);

                var deffName = setDigits(index + 1, 2) + '_' + value.shotName + '_TC-' + setDigits(count, 2) + '_diff_' + browserType + '.png';
                var deffPath = path.resolve(screenShotPath,  deffName);

                var img1 = fs.createReadStream(filePath).pipe(new PNG()).on('parsed', doneReading);
                var img2 = fs.createReadStream(BasicImagePath).pipe(new PNG()).on('parsed', doneReading);
                var filesRead = 0;

                function doneReading() {
                    if (++filesRead < 2) return;
                    var diff = new PNG({width: img1.width, height: img1.height});
                
                    result = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
                
                    diff.pack().pipe(fs.createWriteStream(deffPath));
                }

                browser.pause(200);

                console.log(suiteCount + ') │\t ├  실제 결과 : ' + result);
                console.log(suiteCount + ') │\t └  스샷 저장: ' + deffPath);
                
                addContext(this, {title: 'Mismatched Pixels', value: result});

                if (result > 0)
                {
                    var gameWebComputedStyleArray = getComputedStyleArray();
                    
                    diffStyles = compareStyle(basicComputedStyleArray, gameWebComputedStyleArray);
                    var failsText = '';
                    
                    for (var i = 0; i < diffStyles.failes.length; i++)
                    {
                        //console.log(diffStyles.failes[i].styles.length);

                        if (diffStyles.failes[i].styles.length > 0)
                        {
                            failsText += 'Element = tagName: ' + diffStyles.failes[i].element.tagName + ', id: ' + diffStyles.failes[i].elementid + ', class: ' + diffStyles.failes[i].element.class + '\n';
                            failsText += '{\n';
                            for (var j = 0;  j < diffStyles.failes[i].styles.length; j++)
                            {
                                failsText += '    Style = ' + diffStyles.failes[i].styles[j].style + ' | basic: ' + diffStyles.failes[i].styles[j].basic + ' | gameWeb: ' + diffStyles.failes[i].styles[j].gameWeb + '\n';
                            }
                            failsText += '}\n';
                        }
                    }
                    
                    addContext(this, {title: 'Not Equal Style', value: failsText});
                }

                addContext(this, {title: 'Diff Image', value: screenShotPath + deffName});
                addContext(this, {title: 'GameWeb Image', value: screenShotPath + screenShotName});
                addContext(this, {title: 'Basic Image', value: screenShotPath + BasicImageName});

                chai.expect(result).to.equal(0);
            });
            
            // 07    
            it('[TC-07] NGM Layer 출력위치 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' NGM Layer 출력위치 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'Left : 125 / Top : 270');            
                
                browser.execute(function() {
                    document.documentElement.style.overflowX = 'hidden';
                    document.documentElement.style.overflowY = 'hidden';

                    window.NgmLayer.closeNgmLayer();
                    window.NgmLayer.openNgmLayer();
                });
                
                result = checkLocation();
                
                console.log(suiteCount + ') │\t └  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: 'Left : 125 / Top : 270'});
                addContext(this, {title: '실제 결과', value: 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY});

                chai.expect(result.positionX).to.equal(125);
                chai.expect(result.positionY).to.equal(270);
            });
            // 08
            it('[TC-08] 창크기 축소 후 NGM Layer 위치 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' 창크기 축소 후 NGM Layer 위치 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'Left : 25 / Top : 170');            

                browser.setViewportSize({width: 600, height: 600});
                
                result = checkLocation();
                
                console.log(suiteCount + ') │\t └  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: 'Left : 25 / Top : 170'});
                addContext(this, {title: '실제 결과', value: 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY});

                chai.expect(result.positionX).to.equal(25);
                chai.expect(result.positionY).to.equal(170);
            });
            // 09
            it('[TC-09] 창크기 확대 후 NGM Layer 위치 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' 창크기 확대 후 NGM Layer 위치 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'Left : 125 / Top : 270');            

                browser.setViewportSize({width: 800, height: 800});
                
                result = checkLocation();
                
                console.log(suiteCount + ') │\t └  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: 'Left : 125 / Top : 270'});
                addContext(this, {title: '실제 결과', value: 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY});

                chai.expect(result.positionX).to.equal(125);
                chai.expect(result.positionY).to.equal(270);
            });
            // 10
            it('[TC-10] 스크롤 이동 후 NGM Layer 위치 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' 스크롤 이동 후 NGM Layer 위치 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'Left : 125 / Top : 270');            

                var size = browser.execute(function() {
                    window.scrollTop = document.body.scrollHeight;
                    window.scrollLeft = document.body.scrollWidth;

                    return {'width': window.scrollLeft, 'height': window.scrollTop};
                });
                
                browser.scroll('body', size.value.width, size.value.height);

                result = checkLocation();
                
                console.log(suiteCount + ') │\t └  실제 결과 : ' + 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: 'Left : 125 / Top : 270'});
                addContext(this, {title: '실제 결과', value: 'Left : ' + result.positionX + ' / ' + 'Top : ' + result.positionY});

                chai.expect(result.positionX).to.equal(125);
                chai.expect(result.positionY).to.equal(270);
            });
            // 11
            it('[TC-11] NGM 설치하기 버튼 URL 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' NGM 설치하기 버튼 URL 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'http://help.nexon.com/Download/ngm');

                var element = $('div a img[src$="bt_ngminstall.gif"]').$('..');
                result = element.getAttribute('href');

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result);

                addContext(this, {title: '기대 결과', value: 'http://help.nexon.com/Download/ngm'});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect(element.getAttribute('href')).to.equal('http://help.nexon.com/Download/ngm');
            });
            // 12
            it('[TC-12] NGM 설치하기 버튼 Target 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' NGM 설치하기 버튼 Target 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + '_blank');

                var element = $('div a img[src$="bt_ngminstall.gif"]').$('..');
                result = element.getAttribute('target');

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result);

                addContext(this, {title: '기대 결과', value: '_blank'});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect(result).to.equal('_blank');
            });
            // 13
            it('[TC-13] NGM 설치하기 버튼 클릭 시 새창에서 이동 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' NGM 설치하기 버튼 클릭 시 새창에서 이동 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'Tab Count : 2 / url : http://help.nexon.com/Download/ngm');
                
                // var element = $('div a img[src$="bt_ngminstall.gif"]').$('..');

                browser.execute(function() {
                    if (location.host == 'tfo.nexon.com' || location.host == 'needforspeed-edge.nexon.com')
                    {
                        if (document.documentElement.lastChild.tagName.toLowerCase() == 'iframe')
                        {
                            var element = document.documentElement.lastChild;
                            document.documentElement.removeChild(element);
                        }
                    }
                });
                
                var currentID = browser.getCurrentTabId();
                console.log(currentID);

                browser.execute(function() {
                    window.NgmLayer.openNgmLayer();
                    var imgElements = document.getElementsByTagName('img');
                    var clicklement;

                    for (var i = 0; i < imgElements.length; i++)
                    {
                        if (imgElements[i].getAttribute('src') != null)
                        {
                            if (imgElements[i].getAttribute('src').indexOf('bt_ngminstall.gif') != -1)
                            {
                                clicklement = imgElements[i].parentNode;
                            }
                        }
                    }
                    clicklement.click();
                });
                
                browser.waitUntil(function() {
                    return browser.getTabIds().length === 2;
                }, 5000, '탭 카운트');

                // element.click();
                var tabIds = browser.getTabIds();
                
                result = {};
                result.tabCount = tabIds.length;
                
                
                
                browser.waitUntil(function() {
                    var result = false;

                    for (var i = 0; i < tabIds.length; i++)
                    {
                        if (tabIds[i] != currentID)
                        {
                            browser.switchTab(tabIds[i]);
                            result = true;
                        }
                    }
                    
                    return result;
                }, 10000, '탭 이동');

                console.log(browser.getCurrentTabId());
                
                result.url = browser.getUrl();
                
                console.log(suiteCount + ') │\t └  실제 결과 : ' + 'Tab Count : '  + result.tabCount + ' / url : ' + result.url);
                // browser.saveScreenshot(filePath);
                
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);
                
                browser.close(currentID);
                
                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: 'Tab Count : 2 / url : http://help.nexon.com/Download/ngm'});
                addContext(this, {title: '실제 결과', value: 'Tab Count : '  + result.tabCount + ' / url : ' + result.url});

                chai.expect(result.url).to.equal('http://help.nexon.com/Download/ngm');
            });
            // 14
            it('[TC-14] 버튼 클릭 후 NGM Layer 삭제 확인', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' NGM Layer 삭제 확인');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'true');            

                result = !browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: true});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
            });
            // 15
            it('[TC-15] 시간 설정 후 NGM Layer 삭제 확인(2초)', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' 시간 설정 후 NGM Layer 삭제 확인(2초)');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'true');            

                browser.execute(function() {
                    window.NgmLayer.openNgmLayer(2);
                });

                browser.pause(2200);
                
                result = !browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');

                // result = browser.waitUntil(function () {
                //     return browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]') === false;
                // }, 2500, '설정된 시간이 초과되었습니다. (2초)', 200);

                // result = browser.waitForExist('div h3 img[src$="txt_ngminstall.gif"]', 2500, true);

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: true});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
            });
            // 16
            it('[TC-16] NGM Layer 중복 출력 여부 확인 (5회)', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' NGM Layer 중복 출력 여부 확인 (5회)');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'NGM Layer Count : 1');

                browser.execute(function() {
                    window.NgmLayer.openNgmLayer(2);
                    window.NgmLayer.openNgmLayer(2);
                    window.NgmLayer.openNgmLayer(2);
                    window.NgmLayer.openNgmLayer(2);
                    window.NgmLayer.openNgmLayer(2);
                });

                var elements = browser.elements('div h3 img[src$="txt_ngminstall.gif"]');
                result = elements.value.length;
                
                console.log(suiteCount + ') │\t └  실제 결과 : ' + 'NGM Layer Count : ' + result);

                addContext(this, {title: '기대 결과', value: 1});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect('div h3 img[src$="txt_ngminstall.gif"]').to.have.count(1);
            });
            // 17
            it('[TC-17] 중복 실행 시 타이머 초기화 여부 확인 (2초 설정 후 10초)', function() {
                console.log(suiteCount + ') ├ ' + caseCount + ' 중복 실행 시 타이머 초기화 여부 확인 (2초 5회)');
                console.log(suiteCount + ') │\t ├  기대 결과 : ' + 'false');            

                browser.execute(function() {
                    window.NgmLayer.closeNgmLayer();
                    window.NgmLayer.openNgmLayer(2);
                    window.NgmLayer.openNgmLayer(10);
                });

                browser.pause(2200);
                
                result = browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]');

                // result = browser.waitUntil(function () {
                //     return browser.isExisting('div h3 img[src$="txt_ngminstall.gif"]') === false;
                // }, 2500, '설정된 시간이 초과되었습니다. (2초)', 200);

                // result = !browser.waitForExist('div h3 img[src$="txt_ngminstall.gif"]', 2500, 200, true);

                console.log(suiteCount + ') │\t └  실제 결과 : ' + result);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ') │\t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: false});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
            });
            // 18
            it('[TC-18] 닫기 버튼 클릭 시 NGM Layer 삭제 확인', function() {
                console.log(suiteCount + ') └ ' + caseCount + ' 닫기 버튼 클릭 시 NGM Layer 삭제 확인');
                console.log(suiteCount + ')  \t ├  기대 결과 : ' + 'true');            
                
                browser.execute(function() {
                    window.NgmLayer.openNgmLayer();
                    var imgElements = document.getElementsByTagName('img');
                    var closeElement;

                    for (var i = 0; i < imgElements.length; i++)
                    {
                        if (imgElements[i].getAttribute('src') != null)
                        {
                            if (imgElements[i].getAttribute('src').indexOf('bt_close.gif') != -1)
                            {
                                closeElement = imgElements[i].parentNode;
                            }
                        }
                    }
                    closeElement.click();
                });
                
                // var element = $('div a img[src$="bt_close.gif"]').$('..');
                
                // element.click();
                
                // result = !browser.waitForExist('div h3 img[src$="txt_ngminstall.gif"]');
                result = browser.waitForExist('div h3 img[src$="txt_ngminstall.gif"]', 2500, true);

                console.log(suiteCount + ')  \t ├  실제 결과 : ' + result);
                // browser.saveScreenshot(filePath);
                // console.log(suiteCount + ')  \t └  스샷 저장: ' + filePath);

                // addContext(this, {title: 'Screenshot', value: screenShotPath + screenShotName});
                addContext(this, {title: '기대 결과', value: true});
                addContext(this, {title: '실제 결과', value: result});

                chai.expect('div h3 img[src$="txt_ngminstall.gif"]').not.to.be.there();
            });

            afterEach(function() {
                browser.pause(100);
                count++;
            });

            after(function() {
                count = 1;

                if (index < array.length - 1)
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
    else
    {
        describe.skip(setDigits(index + 1, 2) + '. ' + value.name, function() {
            before(function() {
                count = 1;
                suiteCount = setDigits(index + 1, 2) + '/' + setDigits(array.length, 2);
                console.log(suiteCount + ') ' + setDigits(index + 1, 2) + '. ' + value.name);
            });
            it('게임웹에서 브라우저 지원 안함', function() {
                console.log(suiteCount + ') └   게임웹에서 브라우저 지원 안함');
            });
        });
    }
}

function setBrowserInfo() {
    switch(browser.desiredCapabilities.browserName)
    {
        case 'internet explorer':
        {
            browserType = 'ie' + browser.desiredCapabilities.version;
            break;
        }
        case 'MicrosoftEdge':
        {
            browserType = 'edge';
            break;
        }
        default:
        {
            browserType = browser.desiredCapabilities.browserName;
            break;
        }
    }
}

function setHost(url) {
    var protocolSplits = url.split('//');
    var dotSplits = protocolSplits[1].split('.');
    return dotSplits[0];
}

function compareStyle(basic, gameWeb) {
    var failList = [];
    var value = true;
    var result;

    if (basic !== gameWeb)
    {
        for (var i = 0; i < basic.length; i++)
        {
            var obj = compareObject(basic[i].style, gameWeb[i].style, i);
            
            if (obj.failes.length > 0)
            {
                failList.push({'element': basic[i].element, 'styles': obj.failes});
            }
        }
    }
    
    result = {'value': value, 'failes': failList};
    return result;
}

function compareObject(basic, gameWeb, index) {
    index++;
    var value = true;
    var failes = [];
    var result;

    if (basic === gameWeb)
    {
        // chai.expect(basic).to.equal(gameWeb);
        result = {'value': value, 'failes': failes};
        return result;
    }
    
    if (!(basic instanceof Object) || !(gameWeb instanceof Object))
    {
        console.log('[ERROR]│\t ├  ' + setDigits(index,2) + ') ' + basic + ' | ' + gameWeb);
        result = {'value': value, 'failes': failes};
        return result;
     }
     // if they are not strictly equal, they both need to be Objects
     if (basic.constructor !== gameWeb.constructor)
     {
        console.log('[ERROR]│\t ├  ' + setDigits(index,2) + ') ' + basic + ' | ' + gameWeb);
        result = {'value': value, 'failes': failes};
        return result;
     }
     // they must have the exact same prototype chain, the closest we can do is
     // test there constructor.

    for (var p in basic)
    {
        if (!basic.hasOwnProperty(p))
        {
            continue;
        }

        // chai.expect(gameWeb.hasOwnProperty(p), p).to.be.true;
        if (!gameWeb.hasOwnProperty(p))
        {
            console.log('[ERROR]│\t ├  ' + setDigits(index,2) + ') Style: ' + p + ' | basic: ' + basic[p] + ' | gameWeb: ' + gameWeb[p]);
            failes.push({'style': p, 'basic': basic[p], 'gameWeb': gameWeb[p]});
            // chai.expect(gameWeb).to.have.ownPropertyDescriptor(p);
            // return result;
        }

        // chai.expect(basic[p], p).to.equal(gameWeb[p]);
        if (basic[p] != gameWeb[p])
        {
            console.log('[ERROR]│\t ├  ' + setDigits(index,2) + ') Style: ' + p + ' | basic: ' + basic[p] + ' | gameWeb: ' + gameWeb[p]);
            failes.push({'style': p, 'basic': basic[p], 'gameWeb': gameWeb[p]});
            // chai.expect(basic[p], p).to.equal(gameWeb[p]);
            // return result;
        }
    }
    for (p in gameWeb)
    {
        // chai.expect(gameWeb.hasOwnProperty(p), p).to.equal(original.hasOwnProperty(p));
        if (gameWeb.hasOwnProperty(p) && !basic.hasOwnProperty(p))
        {
            console.log('[ERROR]│\t ├  ' + setDigits(index,2) + ') Style: ' + p + ' | basic: ' + basic[p] + ' | gameWeb: ' + gameWeb[p]);
            failes.push({'style': p, 'basic': basic[p], 'gameWeb': gameWeb[p]});
            // chai.expect(basic).to.have.ownPropertyDescriptor(p);
            // return result;
        }
    }

    result = {'value': value, 'failes': failes};

    return result;
}

function getComputedStyleArray() {
    browser.execute(function() {
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
    });
    
    browser.waitForExist('div h3 img[src$="txt_ngminstall.gif"]', 1000);

    var result = browser.execute(function() {
        
        var element = document.querySelector('div h3 img[src$="txt_ngminstall.gif"]').parentNode.parentNode;
        
        var computedStyleArray = createComputedStyleArray(element, []);
        
        function createComputedStyleArray(element, array) {
            var obj = setValueForComputedStyle(element);

            if (Object.keys(obj).length > 1)
            {
                array.push(setValueForComputedStyle(element));
            }

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
            var agent = navigator.userAgent.toLowerCase();
            var computedStyleObject = {};

            if (element.nodeType == 1)
            {
                computedStyleObject.element = {'tagName': element.tagName, 'id': element.getAttribute('id'), 'clss': element.getAttribute('class')};
                if (agent.indexOf('msie 8') != -1)
                {
                    computedStyleObject.style = element.currentStyle;
                }
                else
                {
                    var styleNames = window.getComputedStyle(element, null);
                    var obj = {};
                    for (var i = 0; i < styleNames.length; i++)
                    {
                        obj[styleNames[i]] = window.getComputedStyle(element, null).getPropertyValue(styleNames[i]);
                    }

                    computedStyleObject.style = obj;
                }
            }
            
            return computedStyleObject;
        }
        
        return computedStyleArray;
    });
    
    return result.value;
}

function getDocumentComputedStyle() {
    var result = browser.execute(function() {
        var body = document.body;
        var result = createComputedStyleArray(body, []);

        return result;

        function createComputedStyleArray(element, array) {
            var obj = setValueForComputedStyle(element);
            if (obj != null)
            {
                array.push(obj);
            }

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
            var agent = navigator.userAgent.toLowerCase();
            var result = null;
            var zIndex;

            if (element.nodeType == 1)
            {
                if (agent.indexOf('msie 8.0') != -1)
                {
                    zIndex =  element.currentStyle['z-index'];
                }
                else
                {
                    zIndex = window.getComputedStyle(element, null).getPropertyValue('z-index');
                }

                if (zIndex != 'auto' && zIndex >= 10000000)
                {
                    result = {};
                    result.tagName = element.tagName;
                    result.id = element.getAttribute('id');
                    result.class = element.getAttribute('class');
                    result['z-index'] = zIndex;
                }
            }
            
            return result;
        }
    });
    
    return result.value;
}

function ngmLayerScreenshot(filePath) {
    browser.execute(function() {
        if (typeof window.NgmLayer == 'object')
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
    browser.pause(500);
    // var image = browser.saveElementScreenshot(filePath, '#moroo-NgmLayer');
    var image = browser.saveScreenshot(filePath);

    // browser.parentNode(500);
    browser.execute(function() {
        if (typeof window.NgmLayer == 'object')
        {
            window.NgmLayer.closeNgmLayer();
        }
        else
        {
            window.closeNgmLayer();
        }
    });

    browser.setViewportSize({width: 800, height: 800});

    return image;
}

function compareNgmLayerImage(imgPath1, imgPaht2, diffPath) {
    var misMatchedPixels;
    var img1 = fs.createReadStream(imgPath1).pipe(new PNG()).on('parsed', doneReading);
    var img2 = fs.createReadStream(imgPaht2).pipe(new PNG()).on('parsed', doneReading);

    function doneReading(done) {
      if (!img1.data || !img2.data)
      {
        return;
      }

      if (img1.width !== img2.width || img1.height !== img2.height)
      {
          console.log('Image dimensions do not match: %dx%d vs %dx%d', img1.width, img1.height, img2.width, img2.height);
          return;
      }

      var diff = new PNG({width: img1.width, height: img1.height});
      
      misMatchedPixels = pixelmatch(img1.data, img2.data, diff.data, diff.width, diff.height, {
        threshold: 0.1,
        includeAA: true
      });

      diff.pack().pipe(fs.createWriteStream(diffPath));
      // console.log(misMatchedPixels);
    }
    
    return misMatchedPixels;
    /*
        var misMatchedPixels;
        var img1 = readImage(imgPath1, function() {
            var img2 = readImage(imgPath2, function () {
                var expectedDiff  = readImage(diffPath, function () {
                    var diff = new PNG({width: img1.width, height: img1.height});

                    misMatchedPixels = match(img1.data, img2.data, diff.data, diff.width, diff.height, {
                        threshold: 0.1,
                        includeAA: true
                    });
                });
            });
        });
        
        return missMatchedPixels;

        function readImage(name, done) {
            return fs.createReadStream(name).pipe(new PNG()).on('parsed', done);
        }
    */
}

function checkDocModeIE7(gameWebInfo) {
    if (host == 'tfo' || host == 'needforspeed-edge')
    {
        var url = browser.execute(function(gameWebInfo) {
            location.href = gameWebInfo.url;
        }, gameWebInfo);

        try {
            if (browser.alertText()) {
                browser.alertAccept();
            }
        }
        catch (e) {
            
        }
    
        browser.waitUntil(function () {
            return gameWebInfo.url === browser.getUrl();
        }, 10000);
        
        browser.execute(function() {
            if (location.host == 'tfo.nexon.com' || location.host == 'needforspeed-edge.nexon.com')
            {
                if (document.documentElement.lastChild.tagName.toLowerCase() == 'iframe')
                {
                    var element = document.documentElement.lastChild;
                    document.documentElement.removeChild(element);
                }
            }
        });
    }
    else
    {
        browser.url(gameWebInfo.url);

        try {
            if (browser.alertText()) {
                browser.alertAccept();
            }
        }
        catch (e) {
            
        }
    }

    var isDocModeIE7 = browser.execute(function() {
        var agent = navigator.userAgent;
        var isDocModeIE7 = false;

        if (agent.indexOf('MSIE 7') != -1)
        {
            isDocModeIE7 = true;
        }

        return isDocModeIE7;
    });

    return isDocModeIE7.value;
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
    if (host == 'tfo' || host == 'needforspeed-edge')
    {
        var url = browser.execute(function(gameWebInfo) {
            location.href = gameWebInfo.url;
        }, gameWebInfo);

        if (browserType == 'firefox' && host == 'csonline')
        {
            browser.pause(2000);
        }
        else
        {
            browser.pause(1000);
        }
        
        browser.execute(function() {
            if (location.host == 'tfo.nexon.com' || location.host == 'needforspeed-edge.nexon.com')
            {
                if (document.documentElement.lastChild.tagName.toLowerCase() == 'iframe')
                {
                    var element = document.documentElement.lastChild;
                    document.documentElement.removeChild(element);
                }
            }
        });
    }
    else
    {
        browser.url(gameWebInfo.url);

        if (browserType == 'firefox' && host == 'csonline')
        {
            browser.pause(5000);
        }
        else
        {
            browser.pause(1000);
        }
        
        try {
            if (browser.alertText())
            {
                browser.alertAccept();
            }
        }
        catch (e) 
        {
            //console.log(e);
        }
    }
    
    if (gameWebInfo.isCookie)
    {
        var cookie = setCookie(gameWebInfo.getCookie);

        if (host == 'tfo' || host == 'needforspeed-edge')
        {
            browser.execute(function(gameWebInfo) {
                location.href = gameWebInfo.url;
            }, gameWebInfo);
        }
        else
        {
            browser.url(gameWebInfo.url);

            if (browserType == 'firefox' && host == 'csonline')
            {
                browser.pause(5000);
            }
            else
            {
                browser.pause(1000);
            }
        }
    }
    
    if (browser.getUrl() != gameWebInfo.url)
    {
        // console.log(browser.getUrl());
    }

    var currentID = browser.getCurrentTabId();
    var tabIds = browser.getTabIds();
    
    if (tabIds.length > 1)
    {
        browser.waitUntil(function() {
            var result = false;

            for (var i = 0; i < tabIds.length; i++)
            {
                if (tabIds[i] != currentID)
                {
                    result = true;
                    browser.switchTab(tabIds[i]);
                    browser.close(currentID);
                }
            }
            
            return result;
        }, 10000, '탭 이동');
    }

    // browser.execute(function() {
    //     var agent = navigator.userAgent;
        
    //     if (agent.indexOf('MSIE 7') != -1)
    //     {
    //         var metas = window.document.getElementsByTagName('meta');
            
    //         for (var i = 0; i < metas.length; i++)
    //         {
    //             var content = metas[i].cotent;
                
    //             if (metas[i].content != null)
    //             {
    //                 if (metas[i].content.indexOf('IE') != -1)
    //                 {
    //                     metas[i].content = 'IE=edge';
    //                 }
    //             }
    //         }
    //         location.reload();
    //     }
    // });
}

function setCookie(getCookie) {
    if (getCookie != '')
    {
        var result = browser.execute(function(getCookie){
            if (getCookie.indexOf(',') != -1)
            {
                var cookies = getCookie.split(',');
                
                for (var i = 0; i < cookies.length; i++)
                {
                    document.cookie = cookies[i].trim();
                }
            }
            else
            {
                document.cookie = getCookie;
            }

            return document.cookie;
        }, getCookie);

        return result.value;
    }
}

function loadedNgmLayer() {
    browser.execute(function() {
        var script = window.document.createElement('script');
        script.type= 'text/javascript';
        script.charset = "utf-8";
        script.src = 'http://127.0.0.1/moroo/ngm-layer.min.js';

        document.getElementsByTagName('head')[0].appendChild(script);
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

function setGameWebInfoList() {
}

function setGameWebInfoXlsx() {
}
