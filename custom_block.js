

//----------------------------------------------------------------------------
// リスト
//----------------------------------------------------------------------------

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
 this.setTooltip("リストの要素を取得");
 this.setHelpUrl("");
  }
};

Blockly.Lua['lists_getindex2'] = function(block) {
  var value_list = Blockly.Lua.valueToCode(block, 'list', Blockly.Lua.ORDER_ATOMIC);
  var value_index = Blockly.Lua.valueToCode(block, 'index', Blockly.Lua.ORDER_ATOMIC);
  var code = value_list + '[' + value_index + ']';
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
  var code = '(' + value_result + '[1]== true)';
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
