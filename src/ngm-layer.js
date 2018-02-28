var NgmLayer = (function(window) {
  // container part
  var instance = null;
  var ELEMENT_TYPE = 1;
  var timerId;
  var innerHeight = window.innerHeight || document.documentElement.clientHeight;
  var innerWidth = window.innerWidth || document.documentElement.clientWidth;
  var styles = {
    globalStyle: {
      padding: '0',
      margin: '0',
      lineHeight: '1',
      fontSize: '11px',
      fontFamily: '"돋움", Dotum',
      color:'#989898',
      fontWeight: 'normal',
      verticalAlign: 'top',
      webkitBoxSizing: 'padding-box',
      mozBoxSizing: 'padding-box',
      msBoxSizing: 'padding-box',
      oBoxSizing: 'padding-box',
      boxSizing: 'padding-box'
    },
    topLayerStyle: {
      position: 'fixed',
      left: '50%',
      top: '50%',
      width: '548px',
      height: '198px',
      border: '1px solid #a1a1a1',
      backgroundColor: '#fff',
      margin: '-130px 0 0 -275px',
      zIndex: '10000000'
    },
    headerStyle: {
      height: '112px'
    },
    paragraphStyle: {
      height: '64px',
      padding: '22px 0 0 29px',
      lineHeight: '1.4',
      backgroundColor: '#f8f8f8'
    },
    strongStyle: {
      lineHeight: '1.4',
      color: '#4782e7'
    },
    ngmBtnInstallStyle: {
      position: 'absolute',
      top: '133px',
      left: '368px'
    },
    ngmBtnCloseStyle: {
      position: 'absolute',
      top: '2px',
      right: '1px'
    },
    ngmImageStyle: {
      border: 'none'
    }
  };
  var attributes = {
    rootContainer: {
      id: 'ngmInstallLayer'
    },
    textImage: {
      src: location.protocol === 'https:' ? 
        'https://ssl.nx.com/s2/p3/ngm/txt_ngminstall.gif' :
        'http://js.nx.com/s2/p3/ngm/txt_ngminstall.gif',
      width: '548',
      height: '112',
      alt: '잠시 후 게임이 자동 실행됩니다.'
    },
    anchorWithInstallButton: {
      href: 'http://help.nexon.com/Download/ngm',
      target: '_blank'
    },
    anchorWithCloseButton: {
      href: '#'
    },
    installImage: {
      src: 'https://ssl.nx.com/s2/p3/ngm/bt_ngminstall.gif',
      width: '150',
      height: '44',
      alt: 'NGM 설치하기'
    },
    closeImage: {
      src: 'https://ssl.nx.com/s2/p3/ngm/bt_close.gif',
      width: '38',
      height: '38',
      alt: 'NGM 설치하기 레이어 닫기'
    }
  };

  function removeInstance() {
    if (instance) {
      instance.removeNgmInstallLayer();
      instance = undefined;
    }
  }

  // instance parrt
  function NgmLayerInstance(second) {
    if (!(this instanceof NgmLayerInstance)) {
      return new NgmLayerInstance(second);
    }
    this.rootElement = null;
    this.removeNgmInstallLayer = function() {
      clearTimer();
      removeNgmDomElement();
      instance = undefined;
    };
    
    var self = this;
    var timeToLiveInSecond = second * 1000 || 5 * 60 * 1000;
    var timerId;
    var eventListenerConfigs = {
      ngmBtnClose: {
        listenerConfigs: [
          {
            eventName: 'click',
            callback: self.removeNgmInstallLayer,
            removeListener: null
          }
        ]
      },
      ngmBtnInstall: {
        listenerConfigs: [
          {
            eventName: 'click',
            callback: self.removeNgmInstallLayer,
            removeListener: null
          }
        ]
      }
    };

    function createNgmInstallLayer() {
      var firstElementInBody = getFirstChildFromBody();
      self.rootElement = makeNgmInstallLayerElement();
      insertNgmLayerAtFirstPlace(firstElementInBody, self.rootElement);
      removeAfterTime(timeToLiveInSecond);
    }
  
    function getFirstChildFromBody() {
      if (document.body.hasChildNodes) {
        var childNodes = document.body.childNodes;
        for (var idx = 0; idx < childNodes.length; idx++) {
          var childNode = childNodes[idx];
          if (childNode.nodeType == ELEMENT_TYPE) { 
            return childNode;
          }
        }
      }
      return null;
    }
  
    function makeNgmInstallLayerElement() {
      return createDomElement('div', {}, mergeObject(styles.globalStyle, styles.topLayerStyle), null, [
              createDomElement('h3', {}, mergeObject(styles.globalStyle, styles.headerStyle), null, [
                  createDomElement('img', attributes.textImage, styles.globalStyle)
                ]),
              createDomElement('p', {}, mergeObject(styles.globalStyle, styles.paragraphStyle), null, [
                  createDomElement('strong', {}, mergeObject(styles.globalStyle, styles.strongStyle), null, [
                      createTextNode('게임이 자동으로 실행되지 않을 경우,')
                  ]), 
                  createTextNode(' NGM을 직접 설치해주세요.'), 
                  createDomElement('br'), 
                  createTextNode('넥슨 게임의 설치 및 실행을 위해서는'), 
                  createDomElement('br'), 
                  createTextNode('Nexon Game Manager (NGM) 설치가 필요합니다.')
                ]),
              createDomElement('a', attributes.anchorWithInstallButton, mergeObject(styles.globalStyle, styles.ngmBtnInstallStyle), eventListenerConfigs.ngmBtnInstall.listenerConfigs, [
                  createDomElement('img', attributes.installImage, mergeObject(styles.globalStyle, styles.ngmImageStyle))
                ]),
              createDomElement('a', attributes.anchorWithCloseButton, mergeObject(styles.globalStyle, styles.ngmBtnCloseStyle, styles.ngmImageStyle), eventListenerConfigs.ngmBtnClose.listenerConfigs, [
                  createDomElement('img', attributes.closeImage, mergeObject(styles.globalStyle, styles.ngmImageStyle))
                ])
            ]);
    }
  
    function createDomElement(tagName, attributes, styles, eventListenerConfigs, childNodes) {
      var element = document.createElement(tagName);
      setAttributes(element, attributes);
      setStyle(element, styles);
      setEventListeners(element, eventListenerConfigs);
      appendChildNodes(element, childNodes);
      return element;
    }
  
    function createTextNode(text) {
      return document.createTextNode(text);
    }
  
    function setAttributes(element, attributes) {
      for (var attribute in attributes) {
        element[attribute] = attributes[attribute];
      }
    }
  
    function appendChildNodes(parentNode, childNodes) {
      childNodes = childNodes || [];
      for (var idx = 0; idx < childNodes.length; idx++) {
        parentNode.appendChild(childNodes[idx]);
      }
    }
  
    function setStyle(element, style) {
      for (var key in style) {
        try {
          element.style[key] = style[key]
        } catch (ex) {}
      }
    }
  
    function setEventListeners(element, eventListenerConfigs) {
      if (eventListenerConfigs) {
        for (var idx = 0; idx < eventListenerConfigs.length; idx++) {
          var listenerConfig = eventListenerConfigs[idx];
          registerEventListenerToElement(element, listenerConfig);
        }
      }
    }
  
    function removeEventListenerOnNgmLayer() {
      for (var key in eventListenerConfigs) {
        var listenerConfigs = eventListenerConfigs[key].listenerConfigs;
        for (var idx = 0; idx < listenerConfigs.length; idx++) {
          listenerConfigs[idx].removeListener();
          listenerConfigs[idx].removeListener = null;
        }
      }
    }
  
    function registerEventListenerToElement(element, listenerConfig) {
      if (element.addEventListener) {
        element.addEventListener(listenerConfig.eventName, listenerConfig.callback);
      } else if (element.attachEvent) {
        element.attachEvent('on' + listenerConfig.eventName, listenerConfig.callback);
      }
      listenerConfig.removeListener = function() {
        return deregisterEventListenerOnElement(element, listenerConfig.eventName, listenerConfig.callback);
      };
    }
  
    function deregisterEventListenerOnElement(element, eventName, listener) {
      if (element.removeEventListener) {
        element.removeEventListener(eventName, listener);
      } else if (element.detachEvent) {
        element.detachEvent('on' + eventName, listener);
      }
    }
  
    function insertNgmLayerAtFirstPlace(firstElementInBody, ngmInstallLayerElement) {
      if (firstElementInBody) {
        firstElementInBody.parentNode.insertBefore(ngmInstallLayerElement, firstElementInBody)
      } else { 
        document.body.appendChild(ngmInstallLayerElement);
      }
    }
  
    function clearTimer() {
      if (timerId) {
        clearTimeout(timerId);
        timerId = undefined;
      }
    }
  
    function removeNgmDomElement() {
      if (self.rootElement) {
        removeEventListenerOnNgmLayer();
        document.body.removeChild(self.rootElement);
      }
    }

    function removeAfterTime(s) {
      timerId = setInterval(self.removeNgmInstallLayer, s);
    }

    NgmLayerInstance.prototype.resetTimer = function(timeToLive) {
      clearTimer();
      timeToLive = timeToLive * 1000 || 5 * 60 * 1000;
      removeAfterTime(timeToLive);
    }

    createNgmInstallLayer();
  }

  function mergeObject(obj1, obj2) {
    var newObj = {};
    for (var idx = 0; idx < arguments.length; idx++) {
      var obj = arguments[idx];
      for (var prop in obj) {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  }

  function findIndexFromArray(array, object) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == object) {
        return i;
      }
    }
    return -1;
  }

  return {
    openNgmLayer: function(second) {
        !instance && (instance = new NgmLayerInstance(second));
    },
    closeNgmLayer: removeInstance
  }
})(window);