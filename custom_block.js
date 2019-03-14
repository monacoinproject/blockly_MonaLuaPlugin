
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

var toString = Object.prototype.toString;
function typeOf(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase();
}

function replaceAll(target, oldChar, newChar) {
  return target.split(oldChar).join(newChar);
}

//----------------------------------------------------------------------------
// 文字関係
//----------------------------------------------------------------------------

Blockly.Blocks['_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("//コメント")
        .appendField(new Blockly.FieldTextInput(""), "comment");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("コメント");
 this.setHelpUrl("");
  }
};

Blockly.Lua['_comment'] = function(block) {
  var text_comment = block.getFieldValue('comment');
  var code = '-- ' + text_comment + '\n';
  return code;
};

Blockly.Blocks['text_plain'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "text");
    this.setOutput(true, null);
    this.setColour(165);
 this.setTooltip("”で囲まないテキスト");
 this.setHelpUrl("");
  }
};

Blockly.Lua['text_plain'] = function(block) {
  var text_text = block.getFieldValue('text');
  var code = text_text;
  return [code, Blockly.Lua.ORDER_NONE];
};


//----------------------------------------------------------------------------
// リスト
//----------------------------------------------------------------------------

Blockly.Blocks['lists_value'] = {
  init: function() {
    this.appendValueInput("_index")
        .setCheck(["String", "Number"])
        .appendField("リストの要素");
    this.appendDummyInput()
        .appendField("");
    this.appendValueInput("_value")
        .setCheck(null)
        .appendField("の値");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(225);
    this.setTooltip("リストの要素を値で初期化");
    this.setHelpUrl("");
  }
};

Blockly.Lua['lists_value'] = function(block) {
  var value__index = Blockly.Lua.valueToCode(block, '_index', Blockly.Lua.ORDER_ATOMIC);
  var value__value = Blockly.Lua.valueToCode(block, '_value', Blockly.Lua.ORDER_ATOMIC);
  if(value__index.charAt(0) == "'" && value__index.slice( -1 ) == "'"){
      value__index = value__index.slice(1, -1);
  }
  var code = value__index + ' = ' + value__value;
  return [code, Blockly.Lua.ORDER_NONE];
};


Blockly.Blocks['lists_getindex2'] = {
  init: function() {
    this.appendValueInput("list")
        .setCheck("Array")
        .appendField("リスト");
    this.appendDummyInput()
        .appendField("の");
    this.appendValueInput("index")
        .setCheck(null)
        .appendField("要素");
    this.appendDummyInput()
        .appendField("を取得");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(225);
 this.setTooltip("リストの要素を取得する");
 this.setHelpUrl("");
  }
};

Blockly.Lua['lists_getindex2'] = function(block) {
  var value_list = Blockly.Lua.valueToCode(block, 'list', Blockly.Lua.ORDER_ATOMIC);
  var value_index = Blockly.Lua.valueToCode(block, 'index', Blockly.Lua.ORDER_ATOMIC);
  var code = value_list + '[' + value_index + ']';
  return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Blocks['lists_setindex2'] = {
  init: function() {
    this.appendValueInput("_list")
        .setCheck("Array")
        .appendField("リスト");
    this.appendDummyInput()
        .appendField("の");
    this.appendValueInput("_index")
        .setCheck(null)
        .appendField("要素");
    this.appendDummyInput()
        .appendField("に");
    this.appendValueInput("_index")
        .setCheck(null)
        .appendField("値");
    this.appendDummyInput()
        .appendField("を格納");
    this.setInputsInline(true);
    this.setColour(225);
 this.setTooltip("リストの要素に値を格納する");
 this.setHelpUrl("");
  }
};

Blockly.Lua['lists_setindex2'] = function(block) {
  var list = Blockly.JavaScript.valueToCode(block, '_list', Blockly.JavaScript.ORDER_ATOMIC);
  var index = Blockly.JavaScript.valueToCode(block, '_index', Blockly.JavaScript.ORDER_ATOMIC);
  var value = Blockly.JavaScript.valueToCode(block, '_value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = list + '[' + index + '] = ' + value;
  return [code, Blockly.Lua.ORDER_NONE];
};



//----------------------------------------------------------------------------
// 通信
//----------------------------------------------------------------------------

// https_get

Blockly.Blocks['https_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("HTTPS GET");
    this.appendValueInput("url")
        .setCheck("String")
        .appendField("URL");
    this.appendValueInput("header")
        .setCheck("Array")
        .appendField("追加するヘッダー");
    this.appendValueInput("proxy")
        .setCheck("String")
        .appendField("プロキシ");
    this.appendValueInput("cafile")
        .setCheck("String")
        .appendField("証明書のファイルパス");
    this.appendDummyInput()
        .appendField("プロトコル")
        .appendField(new Blockly.FieldDropdown([["any","any"], ["tlsv1","tlsv1"], ["tlsv1_1","tlsv1_1"], ["tlsv1_2","tlsv1_2"], ["sslv3","sslv3"], ["sslv23","sslv23"]]), "protocol");
    this.appendDummyInput()
        .appendField("ベリファイ")
        .appendField(new Blockly.FieldDropdown([["none","none"], ["peer","peer"]]), "verify");
    this.appendDummyInput()
        .appendField("取得内容を入れる変数")
        .appendField(new Blockly.FieldVariable("none"), "body");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Lua['https_get'] = function(block) {
  var value_url = Blockly.Lua.valueToCode(block, 'url', Blockly.Lua.ORDER_ATOMIC);
  var value_header = Blockly.Lua.valueToCode(block, 'header', Blockly.Lua.ORDER_ATOMIC);
  var value_proxy = Blockly.Lua.valueToCode(block, 'proxy', Blockly.Lua.ORDER_ATOMIC);
  var value_cafile = Blockly.Lua.valueToCode(block, 'cafile', Blockly.Lua.ORDER_ATOMIC);
  var dropdown_protocol = block.getFieldValue('protocol');
  var dropdown_verify = block.getFieldValue('verify');
  var variable_body = Blockly.Lua.variableDB_.getName(block.getFieldValue('body'), Blockly.Variables.NAME_TYPE);

  var header = "";
  if(value_header.length != "")
  {
    value_header = replaceAll(value_header, "'", "\"");
    value_header = replaceAll(value_header, " = ", "\"] = ");
    value_header = replaceAll(value_header, ", ", "; [\"");
    value_header = replaceAll(value_header, "{", "{[\"");
    value_header = replaceAll(value_header, "}", ";}");
    value_header = replaceAll(value_header, "(", "");
    value_header = replaceAll(value_header, ")", "");
    header = "  headers = " + value_header + ",\n";
  }

  var proxy = (value_proxy == '')? "" : `  proxy = ${value_proxy},\n`;
  var cafile = (value_cafile == '')? "" : `  cafile = ${value_cafile},\n`;

  var code = `{require("ssl.https").request {\n  url = ${value_url},\n  sink = ltn12.sink.table(${variable_body}),\n  protocol = "${dropdown_protocol}",\n  verify = "${dropdown_verify}",\n` + header + proxy + cafile + `}}`;

  return [code, Blockly.Lua.ORDER_NONE];
};


// https post

Blockly.Blocks['https_post'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("HTTPS POST");
    this.appendValueInput("url")
        .setCheck("String")
        .appendField("URL");
    this.appendValueInput("header")
        .setCheck("Array")
        .appendField("追加するヘッダー");
    this.appendValueInput("proxy")
        .setCheck("String")
        .appendField("プロキシ");
    this.appendValueInput("cafile")
        .setCheck("String")
        .appendField("証明書のファイルパス");
    this.appendDummyInput()
        .appendField("プロトコル")
        .appendField(new Blockly.FieldDropdown([["any","any"], ["tlsv1","tlsv1"], ["tlsv1_1","tlsv1_1"], ["tlsv1_2","tlsv1_2"], ["sslv3","sslv3"], ["sslv23","sslv23"]]), "protocol");
    this.appendDummyInput()
        .appendField("ベリファイ")
        .appendField(new Blockly.FieldDropdown([["none","none"], ["peer","peer"]]), "verify");
    this.appendValueInput("request_body")
        .setCheck("String")
        .appendField("送信内容が入った変数");
    this.appendDummyInput()
        .appendField("受信内容を入れる変数")
        .appendField(new Blockly.FieldVariable("none"), "response_body");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Lua['https_post'] = function(block) {
  var value_url = Blockly.Lua.valueToCode(block, 'url', Blockly.Lua.ORDER_ATOMIC);
  var value_header = Blockly.Lua.valueToCode(block, 'header', Blockly.Lua.ORDER_ATOMIC);
  var value_proxy = Blockly.Lua.valueToCode(block, 'proxy', Blockly.Lua.ORDER_ATOMIC);
  var value_cafile = Blockly.Lua.valueToCode(block, 'cafile', Blockly.Lua.ORDER_ATOMIC);
  var dropdown_protocol = block.getFieldValue('protocol');
  var dropdown_verify = block.getFieldValue('verify');
  var value_request_body = Blockly.Lua.valueToCode(block, 'request_body', Blockly.Lua.ORDER_ATOMIC);
  var variable_response_body = Blockly.Lua.variableDB_.getName(block.getFieldValue('response_body'), Blockly.Variables.NAME_TYPE);

  var header = "";
  if(value_header.length != "")
  {
    value_header = replaceAll(value_header, "'", "\"");
    value_header = replaceAll(value_header, " = ", "\"] = ");
    value_header = replaceAll(value_header, ", ", "; [\"");
    value_header = replaceAll(value_header, "{", "{[\"");
    value_header = replaceAll(value_header, "}", ";}");
    value_header = replaceAll(value_header, "(", "");
    value_header = replaceAll(value_header, ")", "");
    header = "  headers = " + value_header + ",\n";
  }

  var proxy = (value_proxy == '')? "" : `  proxy = ${value_proxy},\n`;
  var cafile = (value_cafile == '')? "" : `  cafile = ${value_cafile},\n`;

  var code = `{require("ssl.https").request {\n  url = ${value_url},\n  method = "POST",\n  source = ltn12.source.string(${value_request_body}),\n  sink = ltn12.sink.table(${variable_response_body}),\n  protocol = "${dropdown_protocol}",\n  verify = "${dropdown_verify}",\n` + header + proxy + cafile + `}}`;

  return [code, Blockly.Lua.ORDER_NONE];
};


Blockly.Blocks['check_http_result'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("リクエストが成功したら");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("httpリクエストの結果を返す");
 this.setHelpUrl("");
  }
};

Blockly.Lua['check_http_result'] = function(block) {
  var value_result = Blockly.Lua.valueToCode(block, 'value', Blockly.Lua.ORDER_ATOMIC);
  var code = value_result + '[1]';
  return [code, Blockly.Lua.ORDER_NONE];
};


Blockly.Blocks['get_http_statuscode'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("からステータスコードを取得");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("レスポンスのステータスコードを取得");
 this.setHelpUrl("");
  }
};

Blockly.Lua['get_http_statuscode'] = function(block) {
  var value_result = Blockly.Lua.valueToCode(block, 'value', Blockly.Lua.ORDER_ATOMIC);
  var code = value_result + '[2]';
  return [code, Blockly.Lua.ORDER_NONE];
};



Blockly.Blocks['get_http_responseheader'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("からレスポンスヘッダを取得");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("レスポンスのヘッダを取得");
 this.setHelpUrl("");
  }
};

Blockly.Lua['get_http_responseheader'] = function(block) {
  var value_result = Blockly.Lua.valueToCode(block, 'value', Blockly.Lua.ORDER_ATOMIC);
  var code = value_result + '[3]';
  return [code, Blockly.Lua.ORDER_NONE];
};


Blockly.Blocks['_table_concat'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("を１つのテキストに変換");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("行で分かれているテキストを１つのテキストデータにまとめます");
 this.setHelpUrl("");
  }
};

Blockly.Lua['_table_concat'] = function(block) {
  var value_result = Blockly.Lua.valueToCode(block, 'value', Blockly.Lua.ORDER_ATOMIC);
  var code = 'table.concat(' + value_result + ')';
  return [code, Blockly.Lua.ORDER_NONE];
};


//----------------------------------------------------------------------------
// JSON
//----------------------------------------------------------------------------

// JSON_OBJECT

Blockly.Blocks['_json_object'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true, null);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip("JSONフォーマットを直接記述したい場合に使います。");
    this.setColour(195);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField("JSON");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField("JSON");
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Blockly.Lua['_json_object'] = function(block) {
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Lua.valueToCode(block, 'ADD' + i,
        Blockly.Lua.ORDER_NONE) || 'None';
  }
  var code = '{' + elements.join(', ') + '}';
  return [code, Blockly.Lua.ORDER_NONE];
};


// JSON_ARRAY

Blockly.Blocks['_json_array'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true, null);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip("JSONフォーマットの配列を直接記述したい場合に使います。");
    this.setColour(195);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField("JSON配列");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField("JSON配列");
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Blockly.Lua['_json_array'] = function(block) {
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Lua.valueToCode(block, 'ADD' + i,
        Blockly.Lua.ORDER_NONE) || 'None';
    if(elements[i].charAt(0) == "'" && elements[i].slice( -1 ) == "'"){
      elements[i] = '"' + elements[i].slice(1, -1) + '"';
    }
  }
  var code = '[' + elements.join(', ') + ']';
  return [code, Blockly.Lua.ORDER_NONE];
};


Blockly.Blocks['_json_property'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
    this.appendValueInput("value")
        .setCheck(null)
        .appendField(":");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("JSON プロパティ");
 this.setHelpUrl("");
  }
};

Blockly.Lua['_json_property'] = function(block) {
  var name = Blockly.Lua.valueToCode(block, 'name', Blockly.Lua.ORDER_ATOMIC);
  if(name.charAt(0) == "'" && name.slice( -1 ) == "'"){
      name = '"' + name.slice(1, -1) + '"';
  }
  var value = Blockly.Lua.valueToCode(block, 'value', Blockly.Lua.ORDER_ATOMIC);
  if(value.charAt(0) == "'" && value.slice( -1 ) == "'"){
      value = '"' + value.slice(1, -1) + '"';
  }
  else if(value.charAt(0) == "(" && value.slice( -1 ) == ")"){
      value = value.slice(1, -1);
  }
  var code = name + ':' + value;
  return [code, Blockly.Lua.ORDER_NONE];
};


Blockly.Blocks['_list2json'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Array");
    this.appendDummyInput()
        .appendField("をJSONに変換");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("リストをJSONに変換します");
 this.setHelpUrl("");
  }
};

Blockly.Lua['_list2json'] = function(block) {
  var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
  var code = 'cjson.encode(' + value_name + ')';
  return [code, Blockly.Lua.ORDER_NONE];
};


Blockly.Blocks['_json2list'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("JSON");
    this.appendDummyInput()
        .appendField("をリストに変換");
    this.setInputsInline(true);
    this.setOutput(true, "Array");
    this.setColour(195);
 this.setTooltip("JSONをリストに変換します");
 this.setHelpUrl("");
  }
};

Blockly.Lua['_json2list'] = function(block) {
  var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
  var code = 'cjson.decode(' + value_name + ')';
  return [code, Blockly.Lua.ORDER_NONE];
};


//----------------------------------------------------------------------------
// コールバック
//----------------------------------------------------------------------------

// OnInit()

Blockly.Blocks['_cboninit'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("初期化処理");
    this.appendStatementInput("cbcode")
        .setCheck(null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("プラグインロード時に呼ばれます。");
  }
};

Blockly.Lua['_cboninit'] = function(block) {
  var statements_cbcode = Blockly.Lua.statementToCode(block, 'cbcode');
  var code = 'function OnInit()\n' + statements_cbcode + 'end;\n';
  return code;
};

// OnInit()

Blockly.Blocks['_cbonterm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("終了処理");
    this.appendStatementInput("cbcode")
        .setCheck(null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("プラグイン削除時に呼ばれます。");
  }
};

Blockly.Lua['_cbonterm'] = function(block) {
  var statements_cbcode = Blockly.Lua.statementToCode(block, 'cbcode');
  var code = 'function OnTerm()\n' + statements_cbcode + 'end;\n';
  return code;
};


// OnBlockNotify

Blockly.Blocks['_cbonblocknotify'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ブロック更新通知");
    this.appendDummyInput()
        .appendField("initialsync (bool)");
    this.appendDummyInput()
        .appendField("hash (string)");
    this.appendStatementInput("cbcode")
        .setCheck(null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("ブロックの更新時に呼ばれます。");
  }
};

Blockly.Lua['_cbonblocknotify'] = function(block) {
  var statements_cbcode = Blockly.Lua.statementToCode(block, 'cbcode');
  var code = 'function OnBlockNotify(initialsync, hash)\n' + statements_cbcode + 'end;\n';
  return code;
};


// OnWalletNotify

Blockly.Blocks['_cbonwalletnotify'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ウォレット更新通知");
    this.appendDummyInput()
        .appendField("txid (string)");
    this.appendStatementInput("cbcode")
        .setCheck(null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("ウォレットの更新時に呼ばれます。");
  }
};

Blockly.Lua['_cbonwalletnotify'] = function(block) {
  var statements_cbcode = Blockly.Lua.statementToCode(block, 'cbcode');
  var code = 'function OnWalletNotify(txid)\n' + statements_cbcode + 'end;\n';
  return code;
};


//----------------------------------------------------------------------------
// 返り値判定
//----------------------------------------------------------------------------

Blockly.Blocks['check_result'] = {
  init: function() {
    this.appendValueInput("result")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("成功したら");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(210);
 this.setTooltip("coindへの呼び出しが成功していればtue, 失敗ならfalseを返す");
 this.setHelpUrl("");
  }
};

Blockly.Lua['check_result'] = function(block) {
  var value_result = Blockly.Lua.valueToCode(block, 'result', Blockly.Lua.ORDER_ATOMIC);
  var code = '(' + value_result + '[1] == true)';
  return [code, Blockly.Lua.ORDER_NONE];
};


Blockly.Blocks['check_value'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("結果を取得");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
 this.setTooltip("coindへの呼び出し結果を返す");
 this.setHelpUrl("");
  }
};

Blockly.Lua['check_value'] = function(block) {
  var value_result = Blockly.Lua.valueToCode(block, 'value', Blockly.Lua.ORDER_ATOMIC);
  var code = value_result + '[2]';
  return [code, Blockly.Lua.ORDER_NONE];
};


//----------------------------------------------------------------------------
// ウォレット
//----------------------------------------------------------------------------

// getbalance

Blockly.Blocks['_getbalance'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.itemCount_ = 0;
    this.updateShape_();
    this.setOutput(true, ["Boolean", "Number"]);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip("口座残高を取得します ([account], [minconf], [include_watchonly])");
    this.setColour(60);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField("口座残高を取得");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField("口座残高を取得");
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};


Blockly.Lua['_getbalance'] = function(block) {
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Lua.valueToCode(block, 'ADD' + i,
        Blockly.Lua.ORDER_NONE) || 'None';
  }
  var code = '{coind.getbalance(' + elements.join(', ') + ')}';
  return [code, Blockly.Lua.ORDER_NONE];
};


// sendtoaddress

Blockly.Blocks['_sendtoaddress'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true, ["Boolean", "String"]);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip("送金 (address, amount, [comment], [comment_to], [subtractfeefromamount], [replaceable], [conf_target], [estimate_mode])");
    this.setColour(60);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField("送金（送金アドレス、金額の指定が必要です）");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField("送金");
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Blockly.Lua['_sendtoaddress'] = function(block) {
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Lua.valueToCode(block, 'ADD' + i,
        Blockly.Lua.ORDER_NONE) || 'None';
  }
  var code = '{coind.sendtoaddress(' + elements.join(', ') + ')}';
  return [code, Blockly.Lua.ORDER_NONE];
};


// gettransaction

Blockly.Blocks['_gettransaction'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true, ["Boolean", "Array"]);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip("トランザクション情報の取得 (txid, [include_watchonly])");
    this.setColour(60);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField("トランザクション情報の取得(トランザクションIDは必要です)");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField("トランザクション情報の取得");
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Blockly.Lua['_gettransaction'] = function(block) {
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Lua.valueToCode(block, 'ADD' + i,
        Blockly.Lua.ORDER_NONE) || 'None';
  }
  var code = '{coind.gettransaction(' + elements.join(', ') + ')}';
  return [code, Blockly.Lua.ORDER_NONE];
};


//----------------------------------------------------------------------------
// ブロックチェーン
//----------------------------------------------------------------------------

// getblock

Blockly.Blocks['_getblock'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true, ["Boolean", "Array"]);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip("ブロック情報の取得 (blockhash, [verbosity])");
    this.setColour(60);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField("ブロック情報の取得(ブロックハッシュは必要です)");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField("ブロック情報の取得");
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Blockly.Lua['_getblock'] = function(block) {
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Lua.valueToCode(block, 'ADD' + i,
        Blockly.Lua.ORDER_NONE) || 'None';
  }
  var code = '{coind.getblock(' + elements.join(', ') + ')}';
  return [code, Blockly.Lua.ORDER_NONE];
};
