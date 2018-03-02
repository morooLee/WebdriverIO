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
var path = 'http://127.0.0.1/moroo/ngm-layer.js';

runTestCase();

function runTestCase() {
    console.log(index + '/ ' + gameWebInfoList.length + ') start');
    describe(gameWebInfoList[index].name, function() {
        before(function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') ' + gameWebInfoList[index].name);
            browser.setViewportSize({width: 800, height: 800});
            
        })
        
        it('게임웹 접속', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') 게임웹 접속');

            navigateToGameWeb(gameWebInfoList[index], browser);
            chai.expect(browser.getUrl()).to.equal(gameWebInfoList[index].url);
        });

        it('openNgmLayer() 실행', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') openNgmLayer() 실행');

            runOpenNgmLayer(browser);
        });

        it('NGM Layer 출력여부 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') NGM Layer 출력여부 확인');

            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').to.be.there();
        });
        
        it('NGM Layer 출력위치 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') NGM Layer 출력위치 확인');
            
            browser.execute(function() {
                var html = document.getElementsByTagName('html')[0];
                html.style.overflowX = 'hidden';
                html.style.overflowY = 'hidden';
            });
            
            var result = checkLocation(browser);
            
            chai.expect(result.checkedX).to.equal(true);
            chai.expect(result.checkedY).to.equal(true);
        });

        it('창크기 축소 후 NGM Layer 위치 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') 창크기 변경 후 NGM Layer 위치 확인');
            
            browser.setViewportSize({width: 600, height: 600});
            
            var result = checkLocation(browser);
            
            chai.expect(result.checkedX).to.equal(true);
            chai.expect(result.checkedY).to.equal(true);
        });

        it('창크기 확대 후 NGM Layer 위치 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') 창크기 확대 후 NGM Layer 위치 확인');
            
            browser.setViewportSize({width: 800, height: 800});
            
            var result = checkLocation(browser);
            
            chai.expect(result.checkedX).to.equal(true);
            chai.expect(result.checkedY).to.equal(true);
        });

        it('스크롤 이동 후 NGM Layer 위치 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') 스크롤 이동 후 NGM Layer 위치 확인');

            var size = browser.getElementSize('html')
            browser.scroll(size.width, size.height);
            
            var result = checkLocation(browser);
            
            chai.expect(result.checkedX).to.equal(true);
            chai.expect(result.checkedY).to.equal(true);
        });

        it('NGM 설치하기 버튼 URL 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') NGM 설치하기 버튼 URL 확인');

            var element = $('div a img[src="https://ssl.nx.com/s2/p3/ngm/bt_ngminstall.gif"]').$('..');
            chai.expect(element.getAttribute('href')).to.equal('http://help.nexon.com/Download/ngm');
        });

        it('NGM 설치하기 버튼 Target 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') NGM 설치하기 버튼 Target 확인');

            var element = $('div a img[src="https://ssl.nx.com/s2/p3/ngm/bt_ngminstall.gif"]').$('..');
            chai.expect(element.getAttribute('target')).to.equal('_blank');
        });

        it('NGM 설치하기 버튼 클릭', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') NGM 설치하기 버튼 클릭');

            var element = $('div a img[src="https://ssl.nx.com/s2/p3/ngm/bt_ngminstall.gif"]').$('..');
            
            element.click();
        });

        it('버튼 클릭 후 새창에서 이동 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') 새창에서 이동 확인');

            var tabIds = browser.getTabIds();
            var newUrl = browser.switchTab(tabIds[1]).getUrl();
            
            browser.close();

            chai.expect(newUrl).to.equal('http://help.nexon.com/Download/ngm');
        });

        it('버튼 클릭 후 NGM Layer 삭제 확인', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') NGM Layer 삭제 확인');
            
            chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').not.to.be.there();
        });
        
        it('NGM Layer 시간 설정 확인(5초)', function() {
            console.log(index + '/ ' + gameWebInfoList.length + ') NGM Layer 시간 설정 확인(5초)');

            var result = browser.execute(function() {
                window.NgmLayer.openNgmLayer(5);

                var progressTime = 0;
                
                var interval = setInterval(function() {
                    progressTime++;
                    var element = findNgmLayerElement();

                    if (element == false)
                    {
                        clearInterval(interval);
                    }
                }, 100);

                return progressTime;

                function findNgmLayerElement() {
                    var isFound = false;
                    var imgElements = document.getElementsByTagName('img');
                    for (var index = 0; index < imgElements.length; index++)
                    {
                        if (imgElements[index].getAttribute('src').indexOf('http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif') != -1)
                        {
                            isFound = true;
                        }
                    }
                    return isFound;
                }
            });

            console.log(result.value);
            // chai.expect('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').not.to.be.there();
        });

        after(function() {
            if (index < 2)
            {
                index++;
                console.log(index + '/ ' + gameWebInfoList.length + ') next');
                runTestCase();
            }
            else
            {
                console.log(index + '/ ' + gameWebInfoList.length + ') finish');
            }
        })
    });
};

function navigateToGameWeb(gameWebInfo, browser) {
    this.browser.url(gameWebInfo.url);
    if (this.browser.getUrl() != gameWebInfo.url)
    {
        if (gameWebInfo.isCookie)
        {
            setCookie(gameWebInfo, browser);
            this.browser.url(gameWebInfo.url);
        }
    }
};

function setCookie(gameWebInfo, browser) {
    if (gameWebInfo.getCookie != '')
    {
        if (gameWebInfo.getCookie.indexof(',') > 0)
        {
            var cookies = gameWebInfo.getCookie.split(',').trim();
            for (var cookie in cookies)
            {
                var splitCookie = value.split('=').trim();
                this.browser.setCookie({name: splitCookie[0], value: splitCookie[1]});
            }
        }
        else
        {
            var splitCookie = gameWebInfo.getCookie.split('=').trim();
            this.browser.setCookie({name: splitCookie[0], value: splitCookie[1]});
        }
    }
};

function runOpenNgmLayer(browser) {
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
                NgmLayer.openNgmLayer();
            }
        }
        script.onload = function() {
            loaded = true;
            NgmLayer.openNgmLayer();
        }
        script.src='http://127.0.0.1/moroo/ngm-layer.js';
        window.document.head.appendChild(script);
    });
}

function checkLocation(browser) {
    var element = this.$('div h3 img[src="http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif"]').$('..').$('..');
    var elementLocation = element.getLocation();
    
    var result = this.browser.execute(function() {
        var left;
        var top;
        var imgElements = document.getElementsByTagName('img');
        
        for (var index = 0; index < imgElements.length; index++)
        {
            if (imgElements[index].getAttribute('src').indexOf('http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif') != -1)
            {
                var element = imgElements[index].parentNode.parentNode;

                left = element.offsetLeft - document.body.scrollLeft;
                top = element.offsetTop - document.body.scrollTop;
            }
        }

        return {'left': left, 'top': top};
    });
    
    var viewportSize = this.browser.getViewportSize();

    var positionX = viewportSize.width / 2 - 275;
    var positionY = viewportSize.height / 2 - 100 + 30;

    var checkedX = false; 
    var checkedY = false;

    if (result.value.left == positionX)
    {
        checkedX = true;
    }

    if (result.value.top == positionY - 60)
    {
        checkedY = true;
    }

    return {'checkedX': checkedX, 'checkedY': checkedY};
}
