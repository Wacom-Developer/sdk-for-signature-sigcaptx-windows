//==============================================================================
// wgssSigCaptX.js
// Copyright (c) 2015 Wacom Europe GmbH
//
// 01/04/2015  FRE Created
//==============================================================================
// Loosely based on https://github.com/robertodecurnex/J50Npi
export const JSONreq={map:{},counter:0,getJSON:function(e,t,n){var a=e+(e.indexOf("?")+1?"&":"?"),c=document.getElementsByTagName("head")[0],s=document.createElement("script"),m=[],r="",i="json-"+this.counter;this.counter++,t.script_name=i,t._rand=Math.random(),this.map[i]=n,t.callback="JSONreq.success";for(r in t)m.push(r+"="+encodeURIComponent(t[r]));a+=m.join("&"),s.type="text/javascript",s.src=a,s.id=i,c.appendChild(s)},success:function(e){var t=e.script_name;delete e.script_name,this.map[t](e);var n=document.getElementsByTagName("head")[0],a=document.getElementById(t);n.removeChild(a),delete this.map.script_name}};

/*var JSONreq = {  
    map: {},
    counter: 0,
    getJSON: function(url, data, callback) {
      var src = url + (url.indexOf("?")+1 ? "&" : "?");
      var head = document.getElementsByTagName("head")[0];
      var newScript = document.createElement("script");
      var params = [];
      var param_name = "";
      
      var script_name = "json-" + this.counter;
      this.counter++;
      data["script_name"] = script_name;
      data["_rand"] = Math.random();
      this.map[script_name] = callback;
      
      data["callback"] = "JSONreq.success";
      for(param_name in data){  
          params.push(param_name + "=" + encodeURIComponent(data[param_name]));  
      }
      src += params.join("&");

      newScript.type = "text/javascript";  
      newScript.src = src;
      newScript.id = script_name;
      
      head.appendChild(newScript); 
    },
    success: function(server_data) {
      var script_name = server_data.script_name;
      delete server_data.script_name;
      this.map[script_name](server_data);
      var head = document.getElementsByTagName("head")[0];
      var the_script = document.getElementById(script_name);
      head.removeChild(the_script);
      delete this.map.script_name;
    }
};*/

export class WacomGSS_SignatureSDK
{
  _onDetectRunning;
  service_port;

  constructor (_onDetectRunning, service_port)
  {
    this._onDetectRunning = _onDetectRunning
    this.service_port = service_port;

  this.running = false;
  this.session = null;
  this.service_detected = false;
  let sigsdkptr = this;
  window.sdkPtr = sigsdkptr;
  var server_url = "https://localhost:";
  
  this.RBFlags =
  {
    //RenderOutputBinary : 2048,    // Not supported in SigCaptX
    //RenderOutputFilename : 4096,  // Not supported in SigCaptX
    RenderOutputPicture : 2097152,
    RenderOutputBase64 : 8192,
    RenderBackgroundTransparent : 65536,
    RenderColor1BPP : 131072,
    RenderColor24BPP : 262144,
    RenderColor32BPP : 524288,
    RenderColorAntiAlias : 1048576,
    RenderEncodeData : 4194304,
    RenderWatermark : 8388608,
    RenderClipped : 16777216,
    RenderRelative : 33554432
  };
  
  this.IntegrityStatus = {
    IntegrityOK : 0,
    IntegrityFail : 1,
    IntegrityMissing : 2,
    IntegrityWrongType : 3,
    IntegrityInsufficientData : 4,
    IntegrityUncertain : 5,
    IntegrityUnsupported : 6
  };
  
  this.HashType =
  {
    HashNone : 0,
    HashMD5 : 1,
    HashSHA1 : 2,
    HashSHA224 : 3,
    HashSHA256 : 4,
    HashSHA384 : 5,
    HashSHA512 : 6
  };
  
  this.KeyType =
  {
    KeyNone : 0,
    KeyMD5 : 1,
    KeyMD5MAC : 2,
    KeySHA1 : 3,
    KeySHA224 : 4,
    KeySHA256 : 5,
    KeySHA384 : 6,
    KeySHA512 : 7,
    KeyCAPICOM : 8
  };
  
  this.SignedData =
  {
    DataGood : 0,
    DataNoHash : 1,
    DataBadType : 2,
    DataBadHash : 3,
    DataError : 4,
    DataUncertain : 5,
    DataSigMoved : 6
  };
  
  this.CaptData =
  {
    CaptDigitizer : 26,
    CaptDigitizerDriver : 27,
    CaptMachineOS : 28,
    CaptNetworkCard : 29
  };
  
  this.DynamicCaptureResult =
  {
    DynCaptOK : 0,
    DynCaptCancel : 1,
    DynCaptPadError : 100,
    DynCaptError : 101,
    DynCaptNotLicensed : 103,
    DynCaptAbort : 200,
    DynCaptIntegrityKeyInvalid : 102
  };
  
  this.TimeZone =
  {
    TimeLocal : 0,
    TimeGMT : 1,
    TimeUTC : 1
  };
  
  this.DisplayMode =
  {
    DspForceFit : 0,
    DspUseZoom : 1,
    DspBestFit : 2
  };
  
  this.ShowText =
  {
    TxtDontShow : 0,
    TxtShowLeft : 1,
    TxtShowCenter : 2,
    TxtShowRight : 4
  };
  
  this.ObjectType =
  {
    ObjectText : 0,
    ObjectButton : 1,
    ObjectCheckbox : 2,
    ObjectSignature : 3,
    ObjectInput : 4,
    ObjectInputEcho : 5,
    ObjectHash : 6,
    ObjectImage : 7,
    ObjectDisplayAtShutdown : 8,
    ObjectInking : 9,
    ObjectRadioButton : 10
  };
  
  
  this.TextOptions =
  {
    TextAlignLeft: 0,
    TextAlignRight: 1,
    TextAlignCentre: 2,
    TextAlignJustify: 3
  };
  
  this.ButtonOptions =
  {
    BtnAlignCentre: 0,
    BtnAlignMiddle: 0,
    BtnAlignLeft: 1,
    BtnAlignRight: 2,
    BtnAlignTop: 4,
    BtnAlignBottom: 8
  };
  
  this.CheckBoxOptions = 
  {
    CheckboxUnchecked: 0,
    CheckboxChecked: 1,
    CheckboxDisplayTick: 2,
    CheckboxDisplayCross: 4
  };
  
  this.ObjectOptionType =
  {
    OBJECTOPTION_STRING: 0,
    OBJECTOPTION_INT: 1,
    OBJECTOPTION_BOOL: 2
  };
  
  this.VariantType = 
  {
    VARIANT_EMPTY: 0,
    VARIANT_TEXT: 1,
    VARIANT_NUM : 2,
    VARIANT_OBJECTOPTIONS : 3,
    VARIANT_SIGOBJ: 4,
    VARIANT_SIGCTL: 5,
    VARIANT_INPUTOBJ: 6,
    VARIANT_HASH: 7,
    VARIANT_IMGURL: 8,
    VARIANT_BASE64: 9,
    VARIANT_DYNCAP: 10,
    VARIANT_WIZCTL: 11,
    VARIANT_FONT: 12,
    VARIANT_KEY: 13
  };
  
  this.PrimitiveType =
  {
    PrimitiveLine: 0,
    PrimitiveRectangle: 1,
    PrimitiveEllipse: 2
  };
  
  this.PrimitiveOptions =
  {    
    PrimitiveLineSolid: 0x1,
    PrimitiveLineDashed: 0x2,
    PrimitiveOutline: 0x4,
    PrimitiveFill: 0x8,
    PrimitiveFillXOR: 0x10
  };
  
  this.EventType =
  {    
    EvTextClicked      : 0,
    EvButtonClicked    : 1,
    EvCheckboxChecked  : 2,
    EvCheckboxUnchecked: 3,
    EvInputMinReached  : 4,
    EvInputMaxReached  : 5,
    EvInputExceeded    : 6
  };
  
  this.EncryptAlg = 
  {
    EncryptNone: 0,
    EncryptTripleDES: 1
  }
  
  this.ResponseStatus =
  {
    OK: 0,
    FAILED: 1,
    INVALID_SESSION: 3
  };
  
  this.FontWeight = 
  {
    FW_DONTCARE: 0,
    FW_THIN: 100,
    FW_EXTRALIGHT: 200,
    FW_LIGHT: 300,
    FW_NORMAL: 400,
    FW_MEDIUM: 500,
    FW_SEMIBOLD: 600,
    FW_BOLD: 700,
    FW_EXTRABOLD: 800,
    FW_HEAVY: 900,
    FW_ULTRALIGHT: 200,
    FW_REGULAR: 400,
    FW_DEMIBOLD: 600,
    FW_ULTRABOLD: 800,
    FW_BLACK: 900
  }
  
  this.FontCharset =
  {
    ANSI_CHARSET: 0,
    DEFAULT_CHARSET: 1,
    SYMBOL_CHARSET: 2,
    SHIFTJIS_CHARSET: 128,
    HANGEUL_CHARSET: 129,
    HANGUL_CHARSET: 129,
    GB2312_CHARSET: 134,
    CHINESEBIG5_CHARSET: 136,
    OEM_CHARSET: 255,
    JOHAB_CHARSET: 130,
    HEBREW_CHARSET: 177,
    ARABIC_CHARSET: 178,
    GREEK_CHARSET: 161,
    TURKISH_CHARSET: 162,
    VIETNAMESE_CHARSET: 163,
    THAI_CHARSET: 222,
    EASTEUROPE_CHARSET: 238,
    RUSSIAN_CHARSET: 204,
    MAC_CHARSET: 77,
    BALTIC_CHARSET: 186,
    FS_LATIN1: 0x00000001,
    FS_LATIN2: 0x00000002,
    FS_CYRILLIC: 0x00000004,
    FS_GREEK: 0x00000008,
    FS_TURKISH: 0x00000010,
    FS_HEBREW: 0x00000020,
    FS_ARABIC: 0x00000040,
    FS_BALTIC: 0x00000080,
    FS_VIETNAMESE: 0x00000100,
    FS_THAI: 0x00010000,
    FS_JISJAPAN: 0x00020000,
    FS_CHINESESIMP: 0x00040000,
    FS_WANSUNG: 0x00080000,
    FS_CHINESETRAD: 0x00100000,
    FS_JOHAB: 0x00200000,
    FS_SYMBOL: 0x80000000
  }
  
  this.Font = function(_name, _size, _weight, _charset, _italic, _underline, _strike)
  {
    this.type = sigsdkptr.VariantType.VARIANT_FONT;
    this.fontName = (typeof _name == 'undefined')? "Arial" : _name;
    this.fontSize = (typeof _size == 'undefined')? 8: _size;
    this.sWeight = (typeof _weight == 'undefined')? sigsdkptr.FontWeight.FW_NORMAL: _weight;
    this.sCharset = (typeof _charset == 'undefined')? sigsdkptr.FontCharset.ANSI_CHARSET: _charset;
    this.fItalic = (typeof fItalic == 'undefined')? 0: fItalic;
    this.fUnderline = (typeof _underline == 'undefined')? 0: fUnderline;
    this.fStrikethrough = (typeof _strike == 'undefined')? 0: _strike;
  }

  this.keepAlive = function()
  {
    var data = { 
                   "session": sigsdkptr.session, 
                   "KeepAlive": 1
                 };
    JSONreq.getJSON(server_url + "wacom.js", data, function (){});
    setTimeout(sigsdkptr.keepAlive, 2000);
  }
  
  function onGetSession(server_data) 
  {
    if(0 == server_data.status) 
    {
      sigsdkptr.session = server_data.session
      sigsdkptr.running = true;
      _onDetectRunning();
      setTimeout(sigsdkptr.keepAlive, 2000);
    } 
    else 
    {
      console.log("Signature SDK local server error: " + server_data.status);
    }
  }
  
  function onGetPort(server_data) 
  {
    if(0 == server_data.status) 
    {
      sigsdkptr.service_detected = true;
      server_url += server_data.port + "/";
      var data = { 
                   "CreateSession": 1
                 };
      JSONreq.getJSON(server_url + "wacom.js", data, onGetSession)
    } 
    else 
    {
      console.log("Signature SDK Service error: " + server_data.status);
    }
  }


  function destroySession()
  {
    if (sigsdkptr.session != 0)
    {
      var u = server_url + "wacom.js" + "?DestroySession=1&session="+sigsdkptr.session;

      sigsdkptr.session = 0;

      if (self.Navigator.sendBeacon != undefined)
      {
        self.Navigator.sendBeacon(u);
      }
      else
      {
        var r = new XMLHttpRequest();
        r.open("GET", u, false); // synchronous
        r.send(null);
      }
      
    }
  }

  window.addEventListener('unload', function(event) { destroySession(); });

  function checkService() 
  {
    var data = { "GetPort": 1 };
    JSONreq.getJSON(server_url + service_port + "/wacom.js", data, onGetPort);
  }
  checkService();

  this.getVersion = function(_onGetVersion) {
    var data = {
      "GetVersion": 1,
      "session": sigsdkptr.session,
    };
    function callback(server_data) {
      _onGetVersion(/*thisptr,*/ server_data.version, parseInt(server_data.status));
    }
    JSONreq.getJSON(server_url + "wacom.js", data, callback);
  }

  function checkVar(input)
  {
    return ('undefined' == typeof input || null == input)? "" : input;
  }
  
  this.Hash = function(_onHash)
  {
    var thisptr = this;
    this.handle = null;
    this.type = sigsdkptr.VariantType.VARIANT_HASH;
    
    var data = { 
                 "Hash": "Constructor", 
                 "session": sigsdkptr.session 
               };
    function callback(server_data)
    {
      thisptr.handle = server_data.handle;
      _onHash(thisptr, parseInt(server_data.status));
    }
    JSONreq.getJSON(server_url + "wacom.js", data, callback);
    
    // hData is a sigsdkptr.Variant
    this.Add = function(hData, _onAdd)
    {
      var data = { 
                   "Hash" : "Add",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      hData.Stringify(data, "hData");
      function callback(server_data) 
      {
        _onAdd(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.Clear = function(_onClear)
    {
      var data = { 
                   "Hash" : "Clear",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        _onClear(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetType = function(_onGetType)
    {

      var data = {
                   "Hash" : "GetType",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        // server_data.type type is sigsdkptr.HashType
        _onGetType(thisptr, parseInt(server_data.hashType), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // type is sigsdkptr.HashType
    this.PutType = function(type, _onPutType)
    {
      var data = { 
                   "Hash" : "PutType",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "type": checkVar(type)
                 };
      function callback(server_data) 
      {
        _onPutType(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
  }
  
  this.Key = function(_onKey)
  {
    var thisptr = this;
    this.handle = null;
    this.type = sigsdkptr.VariantType.VARIANT_KEY;
    
    var data = { 
                 "Key": "Constructor", 
                 "session": sigsdkptr.session 
               };
    function callback(server_data)
    {
      thisptr.handle = server_data.handle;
      _onKey(thisptr, parseInt(server_data.status));
    }
    JSONreq.getJSON(server_url + "wacom.js", data, callback);
        
    this.GetType = function(_onGetType)
    {
      var data = { 
                   "Key" : "GetType",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        // server_data.type type is sigsdkptr.KeyType
        _onGetType(thisptr, parseInt(server_data.type), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // type is sigsdkptr.KeyType
    // value is sigsdkptr.Variant
    this.Set = function(type, value, _onSet)
    {
      var data = { 
                   "Key" : "Set",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "type": checkVar(type)
                 };
      value.Stringify(data, "value");
      function callback(server_data) 
      {
        _onSet(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
  }
  
  this.Bitmap = function()
  {
    var thisptr = this;
    this.handle = null;
    this.isBase64 = false;
    this.mime_type = null;
    this.image = new Image();
  }
  
  this.SigObj = function()
  {
    var thisptr = this;
    this.handle = null;
    this.type = sigsdkptr.VariantType.VARIANT_SIGOBJ;
    
    // key is sigsdkptr.Key
    this.CheckIntegrity = function(key, _onCheckIntegrity)
    {
      var data = { 
                   "SigObj" : "CheckIntegrity",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      var vKey = new sigsdkptr.Variant();
      vKey.Set(key);
      vKey.Stringify(data, "key");
      function callback(server_data) 
      {
        //server_data.status type is sigsdkptr.IntegrityStatus
        _onCheckIntegrity(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // hash type is sigsdkptr.Hash
    this.CheckSignedData = function(hash, _onCheckSignedData)
    {
      var data = { 
                   "SigObj" : "CheckSignedData",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "HashHandle": checkVar(hash.handle)
                 };
      function callback(server_data) 
      {
        //server_data.status type is sigsdkptr.SignedData
        _onCheckSignedData(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    
    this.Clear = function(_onClear)
    {
      var data = { 
                   "SigObj" : "Clear",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        _onClear(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    // captData type is sigsdkptr.CaptData
    this.GetAdditionalData = function(captData, _onGetAdditionalData)
    {
      var data = { 
                   "SigObj" : "GetAdditionalData",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "captData": checkVar(captData)
                 };
      function callback(server_data) 
      {
        //server_data.additionalData is a string
        _onGetAdditionalData(thisptr, server_data.additionalData, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    
    this.GetCrossedOut = function(_onGetCrossedOut)
    {
      var data = { 
                   "SigObj" : "GetCrossedOut",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.crossedOut is a bool
        _onGetCrossedOut(thisptr, Boolean(1 == parseInt(server_data.crossedOut)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    // key is a string
    this.GetExtraData = function(key, _onGetExtraData)
    {
      var data = { 
                   "SigObj" : "GetExtraData",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      function callback(server_data) 
      {
        //server_data.extraData is a string
        _onGetExtraData(thisptr, server_data.extraData, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    
    this.GetHeight = function(_onGetHeight)
    {
      var data = { 
                   "SigObj" : "GetHeight",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.height is a number
        _onGetHeight(thisptr, parseInt(server_data.height), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    
    this.GetInk = function(_onGetInk)
    {
      var data = { 
                   "SigObj" : "GetInk",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.ink is a string
        _onGetInk(thisptr, server_data.ink, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    
    this.GetIsCaptured = function(_onGetIsCaptured)
    {
      var data = { 
                   "SigObj" : "GetIsCaptured",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.isCaptured is a bool
        _onGetIsCaptured(thisptr, Boolean(1 == parseInt(server_data.isCaptured)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // key is a string
    this.GetProperty = function(key, _onGetProperty)
    {
      var data = { 
                   "SigObj" : "GetProperty",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      function callback(server_data) 
      {
        var property = new sigsdkptr.Variant();
        property.Parse(server_data, "property");
        _onGetProperty(thisptr, property, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetSigData = function(_onGetSigData)
    {
      var data = { 
                   "SigObj" : "GetSigData",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.sigData is a sigsdkptr.Variant (if it's a VARIANT_TEXT, it's Base64 encoded)
        var sigData = new sigsdkptr.Variant();
        sigData.Parse(server_data, "sigData");
        _onGetSigData(thisptr, sigData, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    
    this.GetSigText = function(_onGetSigText)
    {
      var data = { 
                   "SigObj" : "GetSigText",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.sigText is a string
        _onGetSigText(thisptr, server_data.sigText, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    //timeZone is a sigsdkptr.TimeZone
    this.GetWhen = function(timeZone, _onGetWhen) 
    {
      var data = { 
                   "SigObj" : "GetWhen",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle,
                   "timeZone": checkVar(timeZone)
                 };
      function callback(server_data) 
      {
        //server_data.when is a date
        var date = new Date(
          parseFloat(server_data.year),
          parseFloat(server_data.month) - 1,
          parseFloat(server_data.day),
          parseFloat(server_data.hour), 
          parseFloat(server_data.minute), 
          parseFloat(server_data.second)
        );
        date.dayOfWeek = parseFloat(server_data.dayOfWeek);
        _onGetWhen(thisptr, date, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetWho = function(_onGetWho)
    {
      var data = { 
                   "SigObj" : "GetWho",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.who is a string
        _onGetWho(thisptr, server_data.who, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetWhy = function(_onGetWhy)
    {
      var data = { 
                   "SigObj" : "GetWhy",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.why is a string
        _onGetWhy(thisptr, server_data.why, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetWidth = function(_onGetWidth)
    {
      var data = { 
                   "SigObj" : "GetWidth",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      function callback(server_data) 
      {
        //server_data.width is a number
        _onGetWidth(thisptr, parseInt(server_data.width), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // key is a string
    // value is a string
    this.PutExtraData = function(key, value, _onPutExtraData)
    {
      var data = { 
                   "SigObj" : "PutExtraData",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "key": checkVar(key), 
                   "value": checkVar(value) 
                 };
      function callback(server_data) 
      {
        _onPutExtraData(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // ink is a string
    this.PutInk = function(ink, _onPutInk)
    {
      var data = { 
                   "SigObj" : "PutInk",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "ink": checkVar(ink)
                 };
      function callback(server_data) 
      {
        _onPutInk(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // sigData type is sigsdkptr.Variant
    this.PutSigData = function(sigData, _onPutSigData)
    {
      var data = { 
                   "SigObj" : "PutSigData",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      sigData.Stringify(data, "sigData");
      function callback(server_data) 
      {
        _onPutSigData(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // sigText is a string
    this.PutSigText = function(sigText, _onPutSigText)
    {
      var data = { 
                   "SigObj" : "PutSigText",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "sigText": checkVar(sigText)
                 };
      function callback(server_data) 
      {
        _onPutSigText(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // bitmapURL type is a url
    this.ReadEncodedBitmap = function(bitmapURL, _onReadEncodedBitmap)
    {
      var data = { 
                   "SigObj" : "ReadEncodedBitmap",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle
                 };
      var vBmpUrl = new sigsdkptr.Variant();
      vBmpUrl.type = sigsdkptr.VariantType.VARIANT_IMGURL;
      vBmpUrl.url = bitmapURL;
      vBmpUrl.Stringify(data, "bitmapURL");
      function callback(server_data) 
      {
        _onReadEncodedBitmap(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // mime_type type is a string
    // width is an integer
    // height is an integer
    // ink_width is a real
    // ink_color is an OLE_COLOR number
    // background_color is an OLE_COLOR number
    // flags is a sigsdkptr.RBFlags
    // paddingX is a real
    // paddingY is a real
    this.RenderBitmap = function(mime_type, width, height, ink_width, ink_color, background_color, flags, paddingX, paddingY,_onRenderBitmap) 
    {
      var data = { 
                   "SigObj": "RenderBitmap",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "mimetype": checkVar(mime_type),
                    "width": checkVar(width), 
                   "height": checkVar(height), 
                   "ink_width": checkVar(ink_width), 
                    "ink_color": checkVar(ink_color), 
                   "bg_color": checkVar(background_color),
                   "flags": checkVar(flags),
                   "paddingX": checkVar(paddingX),
                   "paddingY": checkVar(paddingY)
                 };
      function callback(server_data) 
      {
        var status = parseInt(server_data.status);

        if (status == 0)
        {
          if (flags & sigsdkptr.RBFlags.RenderOutputPicture)
          {
            var bmp = new sigsdkptr.Bitmap();
            bmp.handle = server_data.bitmapHandle;
            bmp.isBase64 = (1 == server_data.isBase64 ? true : false);

            bmp.image.onload = function () { _onRenderBitmap(thisptr, bmp, status); };
            if (bmp.isBase64) {
              bmp.image.src = 'data:image/' + mime_type + ';base64,' + server_data.base64;
            }
            else {
              bmp.image.src = server_url + server_data.bitmapHandle + "?session=" + sigsdkptr.session;
            }
          }
          else if (1 == server_data.isBase64)
          {
            _onRenderBitmap(thisptr, server_data.base64, status);
          }
        }
        else
        {
          _onRenderBitmap(thisptr, null, status);
        }
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback)
    }
    // key is a string
    // value is a sigsdkptr.Variant
    this.SetProperty = function(key, value, _onSetProperty)
    {
      var data = { 
                   "SigObj" : "SetProperty",  
                   "session": sigsdkptr.session, 
                   "handle": thisptr.handle, 
                   "key": checkVar(key)
                 };
      value.Stringify(data, "value");
      function callback(server_data) 
      {
        _onSetProperty(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
  }
  
  this.DynamicCapture = function(_onConstructor)
  {
    var thisptr = this;
    this.handle = null;
    
    var data = { 
                 "DynamicCapture": "Constructor", 
                 "session": sigsdkptr.session
               };
    function callback(server_data)
    {
      thisptr.handle = server_data.handle;
      _onConstructor(thisptr, parseInt(server_data.status));
    }
    JSONreq.getJSON(server_url + "wacom.js", data, callback);
    // sigCtl is a sigsdkptr.SigCtl
    // who is a string
    // why is a string
    // what is a sigsdkptr.Hash
    // key is a sigsdkptr.Key
    this.Capture = function(sigCtl, who, why, what, key, _onCapture) {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var left = window.screenLeft ? window.screenLeft : window.screenX;
      var top = window.screenTop ? window.screenTop : window.screenY;
      var data = { 
                   "DynamicCapture": "Capture", 
                   "session": sigsdkptr.session, 
                   "who": checkVar(who), 
                   "why": checkVar(why), 
                   "width": checkVar(width),
                   "height": checkVar(height),
                   "left": checkVar(left),
                   "top": checkVar(top), 
                   "SigCtlHandle": checkVar(sigCtl.handle), 
                   "handle": thisptr.handle 
                 };
      var vWhat = new sigsdkptr.Variant();
      vWhat.Set(what);
      vWhat.Stringify(data, "what");
      var vKey = new sigsdkptr.Variant();
      vKey.Set(key);
      vKey.Stringify(data, "key");
      function callback(server_data)
      {
        var sigObj = new sigsdkptr.SigObj();
        sigObj.handle = server_data.handle;
        //server_data.status type is sigsdkptr.DynamicCaptureResult
        _onCapture(thisptr, sigObj, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetLicence = function(_onGetLicence) {
      var data = { 
                   "DynamicCapture": "GetLicence",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.licence type is string
        _onGetLicence(thisptr, server_data.licence, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // key type is string
    this.GetProperty = function(key, _onGetProperty) {
      var data = { 
                   "DynamicCapture": "GetProperty",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      function callback(server_data)
      {
        var property = new sigsdkptr.Variant();
        property.Parse(server_data, "property");
        _onGetProperty(thisptr, property, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // licence type is string
    this.PutLicence = function(licence, _onPutLicence) {
      var data = { 
                   "DynamicCapture": "PutLicence",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "licence": checkVar(licence)
                 };
      function callback(server_data)
      {
        _onPutLicence(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // key type is string
    // value type is sigsdkptr.Variant
    this.SetProperty = function(key, value, _onSetProperty) {
      var data = { 
                   "DynamicCapture": "SetProperty",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      value.Stringify(data, "value");
      function callback(server_data)
      {
        _onSetProperty(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
  }
  
  this.SigCtl = function(_onConstructor)
  {
    var thisptr = this;
    this.handle = null;
    this.type = sigsdkptr.VariantType.VARIANT_SIGCTL;
    
    var data = { 
                 "SigCtl": "Constructor", 
                 "session": sigsdkptr.session
               };
    function callback(server_data)
    {
      thisptr.handle = server_data.handle;
      _onConstructor(thisptr, parseInt(server_data.status));
    }
    JSONreq.getJSON(server_url + "wacom.js", data, callback);
    
    this.AboutBox = function(_onAboutBox)
    {      
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var left = window.screenLeft ? window.screenLeft : window.screenX;
      var top = window.screenTop ? window.screenTop : window.screenY;
      var data = { 
                   "SigCtl": "AboutBox", 
                   "session": sigsdkptr.session,
                   "width": checkVar(width),
                   "height": checkVar(height),
                   "left": checkVar(left),
                   "top": checkVar(top), 
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        _onAboutBox(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    //key is a string
    this.GetAppData = function(key, _onGetAppData)
    {
      var data = { 
                   "SigCtl": "GetAppData", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      function callback(server_data)
      {
        var appData = new sigsdkptr.Variant();
        appData.Parse(server_data, "appData");
        _onGetAppData(thisptr, appData, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    /*
    this.GetBackColor = function(_onGetBackColor)
    {
      var data = { 
                   "SigCtl": "GetBackColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.appData is an OLE_COLOR (number)
        _onGetBackColor(thisptr, parseInt(server_data.backColor), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBackStyle = function(_onGetBackStyle)
    {
      var data = { 
                   "SigCtl": "GetBackStyle", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.backStyle is a number
        _onGetBackStyle(thisptr, parseInt(server_data.backStyle), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBorderColor = function(_onGetBorderColor)
    {
      var data = { 
                   "SigCtl": "GetBorderColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.borderColor is an OLE_COLOR (number)
        _onGetBorderColor(thisptr, parseInt(server_data.borderColor), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBorderStyle = function(_onGetBorderStyle)
    {
      var data = { 
                   "SigCtl": "GetBorderStyle", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.borderStyle is a number
        _onGetBorderStyle(thisptr, parseInt(server_data.borderStyle), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBorderVisible = function(_onGetBorderVisible)
    {
      var data = { 
                   "SigCtl": "GetBorderVisible", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.borderVisible is a bool
        _onGetBorderVisible(thisptr, Boolean(1 == parseInt(server_data.borderVisible)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBorderWidth = function(_onGetBorderWidth)
    {
      var data = { 
                   "SigCtl": "GetBorderWidth", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.borderWidth is a number
        _onGetBorderWidth(thisptr, parseInt(server_data.borderWidth), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetCaption = function(_onGetCaption)
    {
      var data = { 
                   "SigCtl": "GetCaption", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.caption is a string
        _onGetCaption(thisptr, server_data.caption, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetCtlPadding = function(_onGetCtlPadding)
    {
      var data = { 
                   "SigCtl": "GetCtlPadding", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.ctlPadding is a number
        _onGetCtlPadding(thisptr, parseInt(server_data.ctlPadding), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetDisplayMode = function(_onGetDisplayMode)
    {
      var data = { 
                   "SigCtl": "GetDisplayMode", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.displayMode is a sigsdkptr.DisplayMode
        _onGetDisplayMode(thisptr, parseInt(server_data.displayMode), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetEnabled = function(_onGetEnabled)
    {
      var data = { 
                   "SigCtl": "GetEnabled", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.enabled is a bool
        _onGetEnabled(thisptr, Boolean(1 == parseInt(server_data.enabled)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetForeColor = function(_onGetForeColor)
    {
      var data = { 
                   "SigCtl": "GetForeColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.foreColor is an OLE_COLOR (number)
        _onGetForeColor(thisptr, parseInt(server_data.foreColor), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetInkColor = function(_onGetInkColor)
    {
      var data = { 
                   "SigCtl": "GetInkColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.inkColor is an OLE_COLOR (number)
        _onGetInkColor(thisptr, parseInt(server_data.inkColor), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetInkWidth = function(_onGetInkWidth)
    {
      var data = { 
                   "SigCtl": "GetInkWidth", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.inkWidth is a number
        _onGetInkWidth(thisptr, parseFloat(server_data.inkWidth), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    */
    this.GetInputData = function(_onGetInputData)
    {
      var data = { 
                   "SigCtl": "GetInputData", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.inputData is a string
        _onGetInputData(thisptr, server_data.inputData, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    /*
    this.GetInputSignature = function(_onGetInputSignature)
    {
      var data = { 
                   "SigCtl": "GetInputSignature", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.inputSignature is a string
        _onGetInputSignature(thisptr, server_data.inputSignature, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetInputWho = function(_onGetInputWho)
    {
      var data = { 
                   "SigCtl": "GetInputWho", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.inputWho is a string
        _onGetInputWho(thisptr, server_data.inputWho, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetInputWhy = function(_onGetInputWhy)
    {
      var data = { 
                   "SigCtl": "GetInputWhy", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.inputWhy is a string
        _onGetInputWhy(thisptr, server_data.inputWhy, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    */
    this.GetLicence = function (_onGetLicence) {
      var data = {
        "SigCtl": "GetLicence",
        "session": sigsdkptr.session,
        "handle": thisptr.handle
      };
      function callback(server_data) {
        //server_data.licence is a string
        _onGetLicence(thisptr, server_data.licence, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }

    // key is a string
    this.GetProperty = function(key, _onGetProperty)
    {
      var data = { 
                   "SigCtl": "GetProperty", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      function callback(server_data)
      {
        var property = new sigsdkptr.Variant();
        property.Parse(server_data, "property");
        _onGetProperty(thisptr, property, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    /*
    this.GetRotation = function(_onGetRotation)
    {
      var data = { 
                   "SigCtl": "GetRotation", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.rotation is a number
        _onGetRotation(thisptr, parseInt(server_data.rotation), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetShowWhen = function(_onGetShowWhen)
    {
      var data = { 
                   "SigCtl": "GetShowWhen", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.showWhen is a sigsdkptr.ShowText
        _onGetShowWhen(thisptr, parseInt(server_data.showWhen), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetShowWho = function(_onGetShowWho)
    {
      var data = { 
                   "SigCtl": "GetShowWho", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.showWho is a sigsdkptr.ShowText
        _onGetShowWho(thisptr, parseInt(server_data.showWho), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetShowWhy = function(_onGetShowWhy)
    {
      var data = { 
                   "SigCtl": "GetShowWhy", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.showWhy is a sigsdkptr.ShowText
        _onGetShowWhy(thisptr, parseInt(server_data.showWhy), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    */
    this.GetSignature = function(_onGetSignature)
    {
      var data = { 
                   "SigCtl": "GetSignature", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        var sigObj = new sigsdkptr.SigObj();
        sigObj.handle = server_data.signatureHandle;
        _onGetSignature(thisptr, sigObj, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    /*
    this.GetTabStop = function(_onGetTabStop)
    {
      var data = { 
                   "SigCtl": "GetTabStop", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.tabStop is a bool
        _onGetTabStop(thisptr, Boolean(1 == parseInt(server_data.tabStop)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetWhenFormat = function(_onGetWhenFormat)
    {
      var data = { 
                   "SigCtl": "GetWhenFormat", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.whenFormat is a string
        _onGetWhenFormat(thisptr, server_data.whenFormat, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetZoom = function(_onGetZoom)
    {
      var data = { 
                   "SigCtl": "GetZoom", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.zoom is a number
        _onGetZoom(thisptr, parseInt(server_data.zoom), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }*/
    // key is a string
    // val is sigsdkptr.Variant
    this.PutAppData = function(key, val, _onPutAppData)
    {
      var data = { 
                   "SigCtl": "PutAppData", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      val.Stringify(data, "val");
      function callback(server_data)
      {
        _onPutAppData(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    /*// backColor type is OLE_COLOR (number)
    this.PutBackColor = function(backColor, _onPutBackColor)
    {
      var data = { 
                   "SigCtl": "PutBackColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "backColor": checkVar(backColor)
                 };
      function callback(server_data)
      {
        _onPutBackColor(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // backStyle type is OLE_COLOR (number)
    this.PutBackStyle = function(backStyle, _onPutBackStyle)
    {
      var data = { 
                   "SigCtl": "PutBackStyle", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "backStyle": checkVar(backStyle)
                 };
      function callback(server_data)
      {
        _onPutBackStyle(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // borderColor type is OLE_COLOR (number)
    this.PutBorderColor = function(borderColor, _onPutBorderColor)
    {
      var data = { 
                   "SigCtl": "PutBorderColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "borderColor": checkVar(borderColor)
                 };
      function callback(server_data)
      {
        _onPutBorderColor(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // borderStyle type is a number
    this.PutBorderStyle = function(borderStyle, _onPutBorderStyle)
    {
      var data = { 
                   "SigCtl": "PutBorderStyle", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "borderStyle": checkVar(borderStyle)
                 };
      function callback(server_data)
      {
        _onPutBorderStyle(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // borderVisible type is bool
    this.PutBorderVisible = function(borderVisible, _onPutBorderVisible)
    {
      var data = { 
                   "SigCtl": "PutBorderVisible", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "borderVisible": checkVar(borderVisible)
                 };
      function callback(server_data)
      {
        _onPutBorderVisible(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // borderWidth is a number
    this.PutBorderWidth = function(borderWidth, _onPutBorderWidth)
    {
      var data = { 
                   "SigCtl": "PutBorderWidth", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "borderWidth": checkVar(borderWidth)
                 };
      function callback(server_data)
      {
        _onPutBorderWidth(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // caption type is string
    this.PutCaption = function(caption, _onPutCaption)
    {
      var data = { 
                   "SigCtl": "PutCaption", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "caption": checkVar(caption)
                 };
      function callback(server_data)
      {
        _onPutCaption(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // ctlPadding is a number
    this.PutCtlPadding = function(ctlPadding, _onPutCtlPadding)
    {
      var data = { 
                   "SigCtl": "PutCtlPadding", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "ctlPadding": checkVar(ctlPadding)
                 };
      function callback(server_data)
      {
        _onPutCtlPadding(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // displayMode type is sigsdkptr.DisplayMode (number)
    this.PutDisplayMode = function(displayMode, _onPutDisplayMode)
    {
      var data = { 
                   "SigCtl": "PutDisplayMode", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "displayMode": checkVar(displayMode)
                 };
      function callback(server_data)
      {
        _onPutDisplayMode(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // enabled type is bool
    this.PutEnabled = function(enabled, _onPutEnabled)
    {
      var data = { 
                   "SigCtl": "PutEnabled", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "enabled": checkVar(enabled)
                 };
      function callback(server_data)
      {
        _onPutEnabled(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // foreColor type is OLE_COLOR (number)
    this.PutForeColor = function(foreColor, _onPutForeColor)
    {
      var data = { 
                   "SigCtl": "PutForeColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "foreColor": checkVar(foreColor)
                 };
      function callback(server_data)
      {
        _onPutForeColor(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // inkColor type is OLE_COLOR (number)
    this.PutInkColor = function(inkColor, _onPutInkColor)
    {
      var data = { 
                   "SigCtl": "PutInkColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "inkColor": checkVar(inkColor)
                 };
      function callback(server_data)
      {
        _onPutInkColor(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // inkWidth is a number
    this.PutInkWidth = function(inkWidth, _onPutInkWidth)
    {
      var data = { 
                   "SigCtl": "PutInkWidth", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "inkWidth": checkVar(inkWidth)
                 };
      function callback(server_data)
      {
        _onPutInkWidth(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }*/
    // inputData type is string
    this.PutInputData = function(inputData, _onPutInputData)
    {
      var data = { 
                   "SigCtl": "PutInputData", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "inputData": checkVar(inputData)
                 };
      function callback(server_data)
      {
        _onPutInputData(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    /*// inputSignature type is string
    this.PutInputSignature = function(inputSignature, _onPutInputSignature)
    {
      var data = { 
                   "SigCtl": "PutInputSignature", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "inputSignature": checkVar(inputSignature)
                 };
      function callback(server_data)
      {
        _onPutInputSignature(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // inputWho type is string
    this.PutInputWho = function(inputWho, _onPutInputWho)
    {
      var data = { 
                   "SigCtl": "PutInputWho", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "inputWho": checkVar(inputWho)
                 };
      function callback(server_data)
      {
        _onPutInputWho(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // inputWhy type is string
    this.PutInputWhy = function(inputWhy, _onPutInputWhy)
    {
      var data = { 
                   "SigCtl": "PutInputWhy", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "inputWhy": checkVar(inputWhy)
                 };
      function callback(server_data)
      {
        _onPutInputWhy(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }*/
    // licence type is string
    this.PutLicence = function(licence, _onPutLicence)
    {
      var data = { 
                   "SigCtl": "PutLicence", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "licence": checkVar(licence)
                 };
      function callback(server_data)
      {
        _onPutLicence(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // properties type is string
    this.PutProperties = function(properties, _onPutProperties)
    {
      var data = { 
                   "SigCtl": "PutProperties", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "properties": checkVar(properties)
                 };
      function callback(server_data)
      {
        _onPutProperties(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    /*// font type is sigsdkptr.Variant (sigsdkptr.VariantType.VARIANT_FONT)
    this.PutRefFont = function(font, _onPutRefFont)
    {
      var data = { 
                   "SigCtl": "PutRefFont", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      font.Stringify(data, "font");
      function callback(server_data)
      {
        _onPutRefFont(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // rotation is a number
    this.PutRotation = function(rotation, _onPutRotation)
    {
      var data = { 
                   "SigCtl": "PutRotation", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "rotation": checkVar(rotation)
                 };
      function callback(server_data)
      {
        _onPutRotation(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // showWhen type is sigsdkptr.ShowText
    this.PutShowWhen = function(showWhen, _onPutShowWhen)
    {
      var data = { 
                   "SigCtl": "PutShowWhen", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "showWhen": checkVar(showWhen)
                 };
      function callback(server_data)
      {
        _onPutShowWhen(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // showWho type is sigsdkptr.ShowText
    this.PutShowWho = function(showWho, _onPutShowWho)
    {
      var data = { 
                   "SigCtl": "PutShowWho", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "showWho": checkVar(showWho)
                 };
      function callback(server_data)
      {
        _onPutShowWho(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // showWhy type is sigsdkptr.ShowText
    this.PutShowWhy = function(showWhy, _onPutShowWhy)
    {
      var data = { 
                   "SigCtl": "PutShowWhy", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "showWhy": checkVar(showWhy)
                 };
      function callback(server_data)
      {
        _onPutShowWhy(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }*/
    // sigObj type is sigsdkptr.SigObj
    this.PutSignature = function(sigObj, _onPutSignature)
    {
      var data = { 
                   "SigCtl": "PutSignature", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "signatureHandle": checkVar(sigObj.handle)
                 };
      function callback(server_data)
      {
        _onPutSignature(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    /*// tabStop type is bool
    this.PutTabStop = function(tabStop, _onPutTabStop)
    {
      var data = { 
                   "SigCtl": "PutTabStop", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "tabStop": checkVar(tabStop)
                 };
      function callback(server_data)
      {
        _onPutTabStop(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // whenFormat type is string
    this.PutWhenFormat = function(whenFormat, _onPutWhenFormat)
    {
      var data = { 
                   "SigCtl": "PutWhenFormat", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "whenFormat": checkVar(whenFormat)
                 };
      function callback(server_data)
      {
        _onPutWhenFormat(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // zoom type is a number
    this.PutZoom = function(zoom, _onPutZoom)
    {
      var data = { 
                   "SigCtl": "PutZoom", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "zoom": checkVar(zoom)
                 };
      function callback(server_data)
      {
        _onPutZoom(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }*/
    // key is a string
    // value is sigsdkptr.Variant 
    this.SetProperty = function(key, value, _onSetProperty)
    {
      var data = { 
                   "SigCtl": "SetProperty", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      value.Stringify(data, "value");
      function callback(server_data)
      {
        _onSetProperty(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
  }
  
  this.InputObj = function(_onConstructor)
  {
    var thisptr = this;
    this.handle = null;
    this.type = sigsdkptr.VariantType.VARIANT_INPUTOBJ;

    var data = { 
                 "InputObj": "Constructor", 
                 "session": sigsdkptr.session 
               };
    function callback(server_data)
    {
      thisptr.handle = server_data.handle;
      _onConstructor(thisptr, parseInt(server_data.status));
    }
    JSONreq.getJSON(server_url + "wacom.js", data, callback);
    
    this.Clear = function(_onClear)
    {
      var data = { 
                   "InputObj": "Clear", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        _onClear(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetData = function(_onGetData)
    {
      var data = { 
                   "InputObj": "GetData", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
      // server_data.data is a string
        _onGetData(thisptr, server_data.data, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
        
    this.GetEncryptionType = function(_onGetEncryptionType)
    {
      var data = { 
                   "InputObj": "GetEncryptionType", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.encryptionType type is sigsdkptr.EncryptAlg
        _onGetEncryptionType(thisptr, parseInt(server_data.encryptionType), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
        
    this.GetMaxLength = function(_onGetMaxLength)
    {
      var data = { 
                   "InputObj": "GetMaxLength", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.maxLength is an integer
        _onGetMaxLength(thisptr, parseInt(server_data.maxLength), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
        
    this.GetMinLength = function(_onGetMinLength)
    {
      var data = { 
                   "InputObj": "GetMinLength", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.minLength is an integer
        _onGetMinLength(thisptr, parseInt(server_data.minLength), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
        
    this.GetProperty = function(name, _onGetProperty)
    {
      var data = { 
                   "InputObj": "GetProperty", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "name": checkVar(name)
                 };
      function callback(server_data)
      {
        var property = new sigsdkptr.Variant();
        property.Parse(server_data, "property");
        _onGetProperty(thisptr, server_data.property, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
        
    this.GetText = function(_onGetText)
    {
      var data = { 
                   "InputObj": "GetText", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.text is a string
        _onGetText(thisptr, server_data.text, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // maxLength is an integer    
    this.PutMaxLength = function(maxLength, _onPutMaxLength)
    {
      var data = { 
                   "InputObj": "PutMaxLength", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "maxLength": checkVar(maxLength)
                 };
      function callback(server_data)
      {
        _onPutMaxLength(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // minLength is an integer    
    this.PutMinLength = function(minLength, _onPutMinLength)
    {
      var data = { 
                   "InputObj": "PutMinLength", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "minLength": checkVar(minLength)
                 };
      function callback(server_data)
      {
        _onPutMinLength(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // type is a sigsdkptr.EncryptAlg
    // key is a sigsdkptr.Variant (with type either VARIANT_BASE64 or a base64 encoded VARIANT_TEXT string)
    this.SetEncryption = function(type, key, _onSetEncryption)
    {
      var data = { 
                   "InputObj": "SetEncryption", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "type": checkVar(type)
                 };
      key.Stringify(data, "key");
      function callback(server_data)
      {
        _onSetEncryption(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // name is a string
    // value is    a string
    this.SetProperty = function(name, value, _onSetProperty)
    {
      var data = { 
                   "InputObj": "SetProperty", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "name": checkVar(name),
                   "value": checkVar(value)
                 };
      function callback(server_data)
      {
        _onSetProperty(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
  }
  
  // _type type is sigsdkptr.ObjectOptionType
  this.ObjectOptions = function(/*_type*/)
  {
    var thisptr = this;
    this.type = sigsdkptr.VariantType.VARIANT_OBJECTOPTIONS;//_type;
    
    this.AddOption = function(name, value)
    {
      thisptr[name] = value;
    }
  }
  
  this.Variant = function()
  {
    var thisptr = this;
    
    this.type = sigsdkptr.VariantType.VARIANT_EMPTY;
    
    this.Parse = function(data, id)
    {
      var dataType = parseInt(data[id + '.type']);
      switch(dataType)
      {
        case sigsdkptr.VariantType.VARIANT_TEXT:
        {
          thisptr.type = dataType;
          thisptr.text = data[id + '.text'];
          break;
        }
        case sigsdkptr.VariantType.VARIANT_NUM:
        {
          thisptr.type = dataType;
          thisptr.num = parseFloat(data[id + '.num']);
          break;
        }
        case sigsdkptr.VariantType.VARIANT_OBJECTOPTIONS:
        {
          thisptr.type = dataType;
          /////
          //TODO
          /////
          break;
        }
        case sigsdkptr.VariantType.VARIANT_SIGOBJ:
        case sigsdkptr.VariantType.VARIANT_SIGCTL:
        case sigsdkptr.VariantType.VARIANT_INPUTOBJ:
        case sigsdkptr.VariantType.VARIANT_HASH:
        case sigsdkptr.VariantType.VARIANT_KEY:
        case sigsdkptr.VariantType.VARIANT_DYNCAP:
        case sigsdkptr.VariantType.VARIANT_WIZCTL:
        {
          thisptr.type = dataType;
          thisptr.handle = data[id + '.handle'];
          break;
        }
        case sigsdkptr.VariantType.VARIANT_BASE64:
        {
          thisptr.type = dataType;
          thisptr.base64 = data[id + '.base64'];
          break;
        }
        case sigsdkptr.VariantType.VARIANT_IMGURL:
        {
          thisptr.type = dataType;
          thisptr.url = data[id + '.url'];
          break;
        }
        case sigsdkptr.VariantType.VARIANT_FONT:
        {
          thisptr.type = dataType;
          thisptr.fontName = data[id + '.fontName'];
          thisptr.fontSize = data[id + '.fontSize'];
          thisptr.sWeight = data[id + '.sWeight'];
          thisptr.sCharset = data[id + '.sCharset'];
          thisptr.fItalic = data[id + '.fItalic'];
          thisptr.fUnderline = data[id + '.fUnderline'];
          thisptr.fStrikethrough = data[id + '.fStrikethrough'];
          break;
        }
        case sigsdkptr.VariantType.VARIANT_EMPTY:
        default:
        {
          thisptr.type = sigsdkptr.VariantType.VARIANT_EMPTY;
          break;
        }
      }
    }
    
    this.Set = function(input)
    {
      if('string' === typeof input)
      {
        thisptr.type = sigsdkptr.VariantType.VARIANT_TEXT;
        thisptr.text = input;
      }
      else if('number' === typeof input)
      {
        thisptr.type = sigsdkptr.VariantType.VARIANT_NUM;
        thisptr.num = input;
      }
      else if(null != input && 'object' === typeof input && 'undefined' != typeof input.type &&  null != input.type)
      {
        switch (input.type)
        {
          case sigsdkptr.VariantType.VARIANT_OBJECTOPTIONS:
          {
            thisptr.type = sigsdkptr.VariantType.VARIANT_OBJECTOPTIONS;
            for(o in input)
            {
              if(o != 'type')
              {
                if(typeof input[o] == "string")
                {
                  thisptr[o] = input[o];
                  thisptr[o + ".type"] = sigsdkptr.ObjectOptionType.OBJECTOPTION_STRING;
                }
                else if(typeof input[o] == "number")
                {
                  // truncate: don't use Math.trunc() as it's ECMAScript6 experimental
                  thisptr[o] = input[o]>0 ? Math.floor(input[o]) : Math.ceil(input[o]);
                  thisptr[o + ".type"] = sigsdkptr.ObjectOptionType.OBJECTOPTION_INT;
                }
                else if(typeof input[o] == "boolean")
                {
                  thisptr[o] = (input[o] == true? 1: 0);
                  thisptr[o + ".type"] = sigsdkptr.ObjectOptionType.OBJECTOPTION_BOOL;
                }
              }
            }
            break;
          }
          case sigsdkptr.VariantType.VARIANT_SIGOBJ:
          case sigsdkptr.VariantType.VARIANT_SIGCTL:
          case sigsdkptr.VariantType.VARIANT_INPUTOBJ:
          case sigsdkptr.VariantType.VARIANT_HASH:
          case sigsdkptr.VariantType.VARIANT_KEY:
          case sigsdkptr.VariantType.VARIANT_DYNCAP:
          case sigsdkptr.VariantType.VARIANT_WIZCTL:
          {
            thisptr.type = input.type;
            thisptr.handle = input.handle;
            break;
          }
          case sigsdkptr.VariantType.VARIANT_IMGURL:
          {
            thisptr.type = sigsdkptr.VariantType.VARIANT_IMGURL;
            thisptr.url = input.url;
            break;
          }
          case sigsdkptr.VariantType.VARIANT_BASE64:
          {
            thisptr.type = sigsdkptr.VariantType.VARIANT_BASE64;
            thisptr.base64 = input.base64;
            break;
          }
          case sigsdkptr.VariantType.VARIANT_FONT:
          {
            thisptr.type = sigsdkptr.VariantType.VARIANT_FONT;
            thisptr.fontName = input.fontName;
            thisptr.fontSize = input.fontSize;
            thisptr.sWeight = input.sWeight;
            thisptr.sCharset = input.sCharset;
            thisptr.fItalic = input.fItalic;
            thisptr.fUnderline = input.fUnderline;
            thisptr.fStrikethrough = input.fStrikethrough;
            break;
          }
          case sigsdkptr.VariantType.VARIANT_TEXT:
          {
            thisptr.type = input.type;
            thisptr.text = input.text;
            break;
          }
          case sigsdkptr.VariantType.VARIANT_NUM:
          {
            thisptr.type = input.type;
            thisptr.num = input.num;
            break;
          }
          case sigsdkptr.VariantType.VARIANT_EMPTY:
          default:
          {
            thisptr.type = sigsdkptr.VariantType.VARIANT_EMPTY;
            break;
          }            
        }
      }
    }
    
    this.Stringify = function(datau, id)
    {
      for(var o in thisptr)
      {
        if( typeof o == 'string' && typeof thisptr[o] != 'function' && typeof thisptr[o] != 'symbol' && 
            (typeof thisptr[o] == 'object' || typeof thisptr[o] == 'string' || typeof thisptr[o] == 'number') )
        {
          datau[id + "." + o] = thisptr[o.toString()];
        }
      }
    }    
  }  
  
  this.WizCtl = function(_onConstructor)
  {
    var thisptr = this;
    this.handle = null;
    
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var left = window.screenLeft ? window.screenLeft : window.screenX;
    var top = window.screenTop ? window.screenTop : window.screenY;
    
    var data = { 
                 "WizCtl": "Constructor", 
                 "session": sigsdkptr.session,
                 "width": width,
                 "height": height,
                 "left": left,
                 "top": top
               };
    function callback(server_data)
    {
      thisptr.handle = server_data.handle;
      _onConstructor(thisptr, parseInt(server_data.status));
    }
    JSONreq.getJSON(server_url + "wacom.js", data, callback);
    
    //objType type is sigsdkptr.ObjectType
    //id type is string
    //X type type is a number, text or sigsdkptr.Variant
    //Y type type is a number, text or sigsdkptr.Variant
    //objData type is sigsdkptr.Variant
    //options type is sigsdkptr.Variant
    this.AddObject = function(objType, id, X, Y, objData, options, _onAddObject)
    {
      var data = { 
                   "WizCtl": "AddObject", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "objType": checkVar(objType),
                   "id": checkVar(id)
                 };
      var vX = new sigsdkptr.Variant();
      var vY = new sigsdkptr.Variant();
      vX.Set(X);
      vY.Set(Y);
      vX.Stringify(data, "X");
      vY.Stringify(data, "Y");
      objData.Stringify(data, "objData");
      options.Stringify(data, "options");
      function callback(server_data)
      {
        _onAddObject(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    //primType type is sigsdkptr.PrimitiveType
    //X1 type type is a number, text or sigsdkptr.Variant
    //Y1 type type is a number, text or sigsdkptr.Variant
    //X2 type type is a number, text or sigsdkptr.Variant
    //Y2 type type is a number, text or sigsdkptr.Variant
    //primData type is a VARIANT_NUM sigsdkptr.Variant that indicates the primitive width
    //options is a sigsdkptr.PrimitiveType flag variable as a VARIANT_NUM sigsdkptr.Variant
    this.AddPrimitive = function(primType, X1, Y1, X2, Y2, primData, options, _onAddPrimitive)
    {
      var data = { 
                   "WizCtl": "AddPrimitive", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "primType": checkVar(primType)
                 };
      var vX1 = new sigsdkptr.Variant();
      var vY1 = new sigsdkptr.Variant();
      var vX2 = new sigsdkptr.Variant();
      var vY2 = new sigsdkptr.Variant();
      vX1.Set(X1);
      vY1.Set(Y1);
      vX2.Set(X2);
      vY2.Set(Y2);
      vX1.Stringify(data, "X1");
      vY1.Stringify(data, "Y1");
      vX2.Stringify(data, "X2");
      vY2.Stringify(data, "Y2");
      primData.Stringify(data, "primData");
      options.Stringify(data, "options");
      function callback(server_data)
      {
        _onAddPrimitive(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.Close = function(_onClose)
    {
      var data = { 
                   "WizCtl": "Close", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        _onClose(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.Display = function(_onDisplay)
    {
      var data = { 
                   "WizCtl": "Display", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        _onDisplay(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // id type is string
    this.FireClick = function(id, _onFireClick)
    {
      var data = { 
                   "WizCtl": "FireClick", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "fireClickId": id
                 };
      function callback(server_data)
      {
        _onFireClick(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBackColor = function(_onGetBackColor)
    {
      var data = { 
                   "WizCtl": "GetBackColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.backColor type is OLE_COLOR (number)
        _onGetBackColor(thisptr, parseInt(server_data.backColor), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBorderColor = function(_onGetBorderColor)
    {
      var data = { 
                   "WizCtl": "GetBorderColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.backColor type is OLE_COLOR (number)
        _onGetBorderColor(thisptr, parseInt(server_data.borderColor), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBorderStyle = function(_onGetBorderStyle)
    {
      var data = { 
                   "WizCtl": "GetBorderStyle", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.borderStyle type is a number
        _onGetBorderStyle(thisptr, parseInt(server_data.borderStyle), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBorderVisible = function(_onGetBorderVisible)
    {
      var data = { 
                   "WizCtl": "GetBorderVisible", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.borderVisible is a bool
        _onGetBorderVisible(thisptr, Boolean(1 == parseInt(server_data.borderVisible)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetBorderWidth = function(_onGetBorderWidth)
    {
      var data = { 
                   "WizCtl": "GetBorderWidth", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.borderWidth is a number
        _onGetBorderWidth(thisptr, parseInt(server_data.borderWidth), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetEnableWizardDisplay = function(_onGetEnableWizardDisplay)
    {
      var data = { 
                   "WizCtl": "GetEnableWizardDisplay", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.enableWD is a bool
        _onGetEnableWizardDisplay(thisptr, Boolean(1 == parseInt(server_data.enableWD)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetFont = function(_onGetFont)
    {
      var data = { 
                   "WizCtl": "GetFont", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        var font = new sigsdkptr.Variant();
        font.Parse(server_data, "font");
        _onGetFont(thisptr, font, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetInkingPad = function(_onGetInkingPad)
    {
      var data = { 
                   "WizCtl": "GetInkingPad", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.inkingPad is a bool
        _onGetInkingPad(thisptr, Boolean(1 == parseInt(server_data.inkingPad)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetLicence = function(_onGetLicence) {
      var data = { 
                   "WizCtl": "GetLicence",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.licence type is string
        _onGetLicence(thisptr, server_data.licence, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // id type is string
    this.GetObjectState = function(id, _onGetObjectState) {
      var data = { 
                   "WizCtl": "GetObjectState",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "objectId": checkVar(id)
                 };
      function callback(server_data)
      {
        var state = new sigsdkptr.Variant();
        state.Parse(server_data, "objState");
        _onGetObjectState(thisptr, state, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetPadHeight = function(_onGetPadHeight) {
      var data = { 
                   "WizCtl": "GetPadHeight",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.height type is a number
        _onGetPadHeight(thisptr, parseFloat(server_data.height), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetPadWidth = function(_onGetPadWidth) {
      var data = { 
                   "WizCtl": "GetPadWidth",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        //server_data.width type is a number
        _onGetPadWidth(thisptr, parseFloat(server_data.width), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }    
    // key is a string
    this.GetProperty = function(key, _onGetProperty) {
      var data = { 
                   "WizCtl": "GetProperty",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "key": checkVar(key)
                 };
      function callback(server_data)
      {
        var property = new sigsdkptr.Variant();
        property.Parse(server_data, "property");
        _onGetProperty(thisptr, property, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetVisibleWindow = function(_onGetVisibleWindow) {
      var data = { 
                   "WizCtl": "GetVisibleWindow",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.visible type is boolean
        _onGetVisibleWindow(thisptr, Boolean(1 == parseInt(server_data.visible)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.GetZoom = function(_onGetZoom) {
      var data = { 
                   "WizCtl": "GetZoom",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.zoom type is a number
        _onGetZoom(thisptr, parseFloat(server_data.zoom), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.PadConnect = function(_onPadConnect) {
      var data = { 
                   "WizCtl": "PadConnect",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        // server_data.padConnect type is a bool
        _onPadConnect(thisptr, Boolean(1 == parseInt(server_data.padConnect)), parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.PadDisconnect = function(_onPadDisconnect) {
      var data = { 
                   "WizCtl": "PadDisconnect",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        _onPadDisconnect(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // backColor type is OLE_COLOR (number)
    this.PutBackColor = function(backColor, _onPutBackColor)
    {
      var data = { 
                   "WizCtl": "PutBackColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "backColor": checkVar(backColor)
                 };
      function callback(server_data)
      {
        _onPutBackColor(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // borderColor type is OLE_COLOR (number)
    this.PutBorderColor = function(borderColor, _onPutBorderColor)
    {
      var data = { 
                   "WizCtl": "PutBorderColor", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "borderColor": checkVar(borderColor)
                 };
      function callback(server_data)
      {
        _onPutBorderColor(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // borderStyle type is a number
    this.PutBorderStyle = function(borderStyle, _onPutBorderStyle)
    {
      var data = { 
                   "WizCtl": "PutBorderStyle", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "borderStyle": checkVar(borderStyle)
                 };
      function callback(server_data)
      {
        _onPutBorderStyle(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    // borderVisible type is bool
    this.PutBorderVisible = function(borderVisible, _onPutBorderVisible)
    {
      var data = { 
                   "WizCtl": "PutBorderVisible", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "borderVisible": checkVar(borderVisible)
                 };
      function callback(server_data)
      {
        _onPutBorderVisible(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // borderWidth is a number
    this.PutBorderWidth = function(borderWidth, _onPutBorderWidth)
    {
      var data = { 
                   "WizCtl": "PutBorderWidth", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "borderWidth": checkVar(borderWidth)
                 };
      function callback(server_data)
      {
        _onPutBorderWidth(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // enableWD is a bool
    this.PutEnableWizardDisplay = function(enableWD, _onPutEnableWizardDisplay)
    {
      var data = { 
                   "WizCtl": "PutEnableWizardDisplay", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "enableWD": checkVar(enableWD)
                 };
      function callback(server_data)
      {
        _onPutEnableWizardDisplay(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // font type is sigsdkptr.Variant (sigsdkptr.VariantType.VARIANT_FONT)
    this.PutFont = function(font, _onPutFont)
    {
      var data = { 
                   "WizCtl": "PutFont", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      font.Stringify(data, "font");
      function callback(server_data)
      {
        _onPutFont(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // licence type is a string
    this.PutLicence = function(licence, _onPutLicence) {
      var data = {
                   "WizCtl": "PutLicence",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "licence": checkVar(licence)
                 };
      function callback(server_data)
      {
        _onPutLicence(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // height type is a number
    this.PutPadHeight = function(height, _onPutPadHeight) {
      var data = {
                   "WizCtl": "PutPadHeight",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "height": checkVar(height)
                 };
      function callback(server_data)
      {
        _onPutPadHeight(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // width type is a number
    this.PutPadWidth = function(width, _onPutPadWidth) {
      var data = {
                   "WizCtl": "PutPadWidth",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "width": checkVar(width)
                 };
      function callback(server_data)
      {
        _onPutPadWidth(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // properties type is a string
    this.PutProperties = function(properties, _onPutProperties) {
      var data = {
                   "WizCtl": "PutProperties",
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "properties": checkVar(properties)
                 };
      function callback(server_data)
      {
        _onPutProperties(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // font type is sigsdkptr.Variant (sigsdkptr.VariantType.VARIANT_FONT)
    this.PutRefFont = function(font, _onPutRefFont)
    {
      var data = { 
                   "WizCtl": "PutRefFont", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      font.Stringify(data, "font");
      function callback(server_data)
      {
        _onPutRefFont(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // visible type is boolean
    this.PutVisibleWindow = function(visible, _onPutVisibleWindow)
    {
      var data = { 
                   "WizCtl": "PutVisibleWindow", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "visible": Number( visible )
                 };
      function callback(server_data)
      {
        _onPutVisibleWindow(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // zoom type is a real number
    this.PutZoom = function(zoom, _onPutZoom)
    {
      var data = { 
                   "WizCtl": "PutZoom", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "zoom": checkVar(zoom)
                 };
      function callback(server_data)
      {
        _onPutZoom(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    this.Reset = function(_onReset)
    {
      var data = { 
                   "WizCtl": "Reset", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      function callback(server_data)
      {
        _onReset(thisptr, parseInt(server_data.status));
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    // key type is string
    // value type is sigsdkptr.Variant
    this.SetProperty = function(key, value, _onSetProperty)
    {
      var data = { 
                   "WizCtl": "SetProperty", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle,
                   "key": key
                 };
      function callback(server_data)
      {
        _onSetProperty(thisptr, parseInt(server_data.status));
      }
      value.Stringify(data, "value");
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
    var evh;
    this.SetEventHandler = function(eventHandler)
    {
      var data = { 
                   "WizCtl": "SetEventHandler", 
                   "session": sigsdkptr.session,
                   "handle": thisptr.handle
                 };
      evh = eventHandler;
                 
      function callback(server_data)
      {
        var update_data = { 
                            "WizCtl": "UpdateEventHandler", 
                            "session": sigsdkptr.session,
                            "handle": thisptr.handle
                          };
        if(0 == parseInt(server_data.status))
        {
          JSONreq.getJSON(server_url + "wacom.js", update_data, callback);
        }
        else if ("undefined" === typeof(server_data.status)) return;
        setTimeout( function(){ evh(thisptr.handle, server_data["event-id"], parseInt(server_data["event-type"]), parseInt(server_data.status)); }, 0);
      }
      JSONreq.getJSON(server_url + "wacom.js", data, callback);
    }
    
  } // WizCtl
}
};
