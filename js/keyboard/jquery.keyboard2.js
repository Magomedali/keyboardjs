
var size = window.screen.width <= 800 ? "_800x600" : "";
var CSSFileName = "<link type=\"text/css\" href=\"keyboard/css/keyboard" + size + ".css\" rel=\"stylesheet\"/>";
document.write(CSSFileName);

(function($){
 	
 	function Keyboard(node,useroptions){
 		if(!node.length) return;

        this.block = node;
        


    	this.field = null;
    	
    	this.field_wrapper = null;
    	
    	this.ruInputValue = null;

    	this.inputValue = null;
    	
    	this.ru_base_part = null;
    	
    	this.ru_region_part = null;
    	
    	this.inputRuNumber = null;
    	
    	this.inputRuRegion = null;

    	this.options = jQuery.extend({
			//Default properties
			title: "",

			desc:"",

			showDesc:false,

			buttons_bg:"blue",

			keyboardId:"keyboard",

			inputId:"keyboard_textbox",

			isRuType:false,

			checkPatterns:[],

			validColor:"rgb(98, 150, 44)",

			unvalidColor:"#ff1836",

			validCallback:function(){},

			changeCallback:function(){},

			unvalidCallback:function(){}
		},useroptions);


    	this.keyboardBlock = $("<div/>").attr("id",this.options.keyboardId).addClass("keyboard");


    	this.keyboard_field = $("<div/>").attr("id",this.options.keyboardId+"-field");


		this.initPluginBlock =  function(){
			if(!this.block.length) return;

			this.block.html("");
			this.block.addClass("keyboard-block");
			this.block.append($("<h3/>").html(this.options.title));

			this.field = $("<div/>").attr("id","input");
			this.inputValue = $("<input/>").attr("type","text")
										.attr("name","code")
										.attr("id",this.options.inputId)
										.attr('tabIndex', '-1')
										.attr('autocomplete', 'off');

			this.keyboard_field.append(this.field.append(this.inputValue));
			
			if(this.options.showDesc && this.options.desc){
				var descP = $("<p/>").attr("class","keyboard_input-info").html(this.options.desc);
				this.keyboard_field.append(descP);
			}

			this.block.append(this.keyboard_field);

			return this;
		};





		this.initPluginBlockForRu =  function(){
			if(!this.block.length) return;

			this.block.html("");
			this.block.addClass("keyboard-block");
			this.block.append($("<h3/>").html(this.options.title));

			
			this.field = $("<div/>").attr("class","field");
			this.field_wrapper = $("<div/>").attr("id","field-wrapper");

			this.ru_base_part = $("<div/>").attr("id","base_part");
			this.ru_region_part = $("<div/>").attr("id","region_part");
			 
			this.inputRuNumber = $("<input/>").attr("type","text").attr("name","number").addClass("keyboard_ru-number").attr("placeholder","A777AA").attr("maxlength","6");
			this.inputRuRegion = $("<input/>").attr("type","text").attr("name","region").addClass("keyboard_ru-region").attr("placeholder","777").attr("maxlength","3");
			
			this.ruInputValue = $("<input/>").attr("type","hidden").attr("name","keyboard_ru_number").attr("id",this.options.inputId);
			
			this.ru_base_part.append(this.inputRuNumber);
			this.ru_region_part.append(this.inputRuRegion);

			this.field_wrapper.append(this.ru_base_part).append(this.ru_region_part);
			this.field.append(this.field_wrapper);

			this.keyboard_field.append(this.field);

			if(this.options.showDesc && this.options.desc){
				var descP = $("<p/>").attr("class","keyboard_input-info").html(this.options.desc);
				this.keyboard_field.append(descP);
			}

			this.block.append(this.keyboard_field);
			this.block.append(this.ruInputValue);

			return this;
		};





		this.initPluginKeyboard = function(buttons){

			var keyboardBlock = this.keyboardBlock;
			var options = this.options;
			jQuery.map(buttons,function(group){
				var list = $("<ul/>");
				jQuery.map(group,function(b,i){
					var li = $("<li/>").attr("id","kv_"+b.value).attr("data-value",b.value).html(b.title);
					if(i == 0) li.addClass("left_btn");
					if(i == (group.length - 1)) li.addClass("right_btn");

					var bg = b.hasOwnProperty("bg") && b.bg != "" ? b.bg : options.buttons_bg; 
					li.addClass("color-"+bg);

					list.append(li);
				});
				keyboardBlock.append(list);
			});
			
			this.keyboardBlock = keyboardBlock;

			this.block.append(this.keyboardBlock);

			if(this.options.isRuType){
				this.initHandlerEventKeyButtonForRu();
			}else{
				this.initHandlerEventKeyButton();
			}
			
			
			return this.keyboardBlock;
		};




		this.validateNumber = function(number){
			if(number){
				var patterns = this.options.checkPatterns;
				var p_l = patterns.length;
				if(p_l){
					var pattern = patterns.join("|");
					var reg = new RegExp(pattern);
					

					return this.options.isRuType ? reg.exec(number) :  reg.test(number);
				}else{
					return true;
				}
			}else{
				return false;
			}
		};



		this.validEvent = function(matches){
			
			var validCallback = this.options.validCallback;
			if(typeof validCallback == "function") validCallback();

			this.block.find("input").css("color",this.options.validColor);

			if(matches){
				//Исключаем 
				var length = matches.length;
				var groups = [];
				for (var i = 0; i < length; i++) {
					if(matches[i]){
						groups.push(matches[i]);
					}
							
				}
						
				if(groups.length){
					var fullNumber = groups[0];
					var regionNumber = groups[groups.length-1];
					var number = fullNumber.substr(0, fullNumber.length - regionNumber.length);
					//this.inputRuNumber.attr("maxlength",number.length);
					this.inputRuNumber.val(number);
					this.inputRuRegion.val(regionNumber);
				}
			}
		};



		this.unvalidEvent = function(){
			var unvalidCallback = this.options.unvalidCallback;
			if(typeof unvalidCallback == "function") unvalidCallback();

			this.block.find("input").css("color",this.options.unvalidColor);
		};



		this.initHandlerEventKeyButton = function(){

			var context = this;

			this.keyboardBlock.find("li").click(function(event){

				var button_value = $(this).attr("data-value");
				var fieldId = context.options.keyboardId;
				var input = $("#"+fieldId+"-field input");
			
				var value = input.val();
						
				if(button_value == "back"){
					var l = value.length;
					if(!l) return;
					value = value.substring(0,l-1);
					input.val(value);
				}else if(button_value == "clear"){
					value = "";
					input.val(value);
				}else{
					value +=button_value;
					input.val(value);
				}

				if(context.validateNumber(value.toLocaleUpperCase())){
					context.validEvent();
				}else{
					context.unvalidEvent();
				}
					
				var changeCallback = context.options.changeCallback;
				if(typeof changeCallback == "function") changeCallback();
			});
		}



		this.initHandlerEventKeyButtonForRu = function(){

			var context = this;

			this.keyboardBlock.find("li").click(function(event){
				var button_value = $(this).attr("data-value");
				var allInputs = context.field_wrapper.find("input");
				var value = "";

				// console.log();

				if(button_value == "back"){
					var input = context.getPrevInput();
					if(!input || !input.length) return;
					value = input.val();
					var l = value.length;
					if(!l) return;
					input.val(value.substring(0,l-1));
				}else if(button_value == "clear"){
					allInputs.val("");
				}else{
					var input = context.getNextInput();
					if(!input || !input.length) return;
					var maxlength = parseInt(input.attr("maxlength"));
					value = input.val();
					 if(maxlength > value.length){
						value += button_value;
						input.val(value);
					}
				}

				var number_value = "";
				allInputs.each(function(){
					number_value += $(this).val().toString().toLocaleUpperCase();
				});


				
				// if(context.options.ruPattern.length){
				// 	var reg = new RegExp(context.options.ruPattern);
				// 	var matches = reg.exec(number_value);
				// 	if(matches){

				// 		//console.log(reg);
				// 		//console.log(matches);
				// 		//Исключаем 
				// 		var length = matches.length;
				// 		var groups = [];
				// 		for (var i = 0; i < length; i++) {
				// 			if(matches[i]){
				// 				groups.push(matches[i]);
				// 			}
							
				// 		}
						
				// 		//console.log(groups);
				// 		if(groups.length){
				// 			var fullNumber = groups[0];
				// 			var regionNumber = groups[groups.length-1];
				// 			var number = fullNumber.substr(0, fullNumber.length - regionNumber.length);
				// 			//this.inputRuNumber.attr("maxlength",number.length);
				// 			context.inputRuNumber.val(number);
				// 			context.inputRuRegion.val(regionNumber);
				// 		}
				// 	}
				// }

				var result = context.validateNumber(number_value);
				if(result){
					context.validEvent(result);
				}else{
					context.unvalidEvent();
				}
				
				context.ruInputValue.val(number_value);
				var changeCallback = context.options.changeCallback;
				if(typeof changeCallback == "function") changeCallback();
			});
		}



		this.getNextInput = function(){
			if(!this.options.isRuType) return;

			var number = this.inputRuNumber.val();
			var region = this.inputRuRegion.val();
			if(!region.length && number.length < parseInt(this.inputRuNumber.attr("maxlength"))){
				return this.inputRuNumber;
			}else if(region.length < parseInt(this.inputRuRegion.attr("maxlength"))){
				return this.inputRuRegion;
			}
			return;
		}



		this.getPrevInput = function(){
			if(!this.options.isRuType) return;

			var number = this.inputRuNumber.val();
			var region = this.inputRuRegion.val();
			
			if(region.length && region.length <= parseInt(this.inputRuRegion.attr("maxlength"))){
				return this.inputRuRegion;
			}else if(number.length && number.length <= parseInt(this.inputRuNumber.attr("maxlength"))){
				return this.inputRuNumber;
			}

			return;
		}



		this.setValue = function(value){
			
			if(this.options.isRuType && this.ruInputValue.length && this.inputRuNumber.length && this.inputRuRegion.length){
				
				var maxRuNumber = this.inputRuNumber.attr("maxlength");
				var maxRuRegion = this.inputRuRegion.attr("maxlength");
				if(value.length > maxRuNumber){

					var l = value.length;
					this.inputRuNumber.val(value.substring(0,maxRuNumber));
					var region = value.substring(maxRuNumber);
					this.inputRuRegion.val(region.substring(0,maxRuRegion));
					
				}else{
					this.inputRuNumber.val(value);
					this.inputRuRegion.val("");
				}

				this.ruInputValue.val(value);
			}else if(this.inputValue.length){
				this.inputValue.val(value);
			}

			if(this.validateNumber(value.toLocaleUpperCase())){
				this.validEvent();
			}else{
				this.unvalidEvent();
			}
		}



		this.getValue = function(){
			if(this.options.isRuType && this.ruInputValue.length){
				return this.ruInputValue.val();
			}else if(this.inputValue.length){
				return this.inputValue.val();
			}
		}


		return this;
 	}
 	//Конец класса





	


	jQuery.fn.keyboard = function(options){
		
		var buttons = [
			[
				{title:"1",value:"1",bg:"blue"},
				{title:"2",value:"2",bg:"blue"},
				{title:"3",value:"3",bg:"blue"},
				{title:"4",value:"4",bg:"blue"},
				{title:"5",value:"5",bg:"blue"},
				{title:"6",value:"6",bg:"blue"},
				{title:"7",value:"7",bg:"blue"},
				{title:"8",value:"8",bg:"blue"},
				{title:"9",value:"9",bg:"blue"},
				{title:"0",value:"0",bg:"blue"},
				{title:"&lt;",value:"back",bg:"back"},
				{title:"c",value:"clear",bg:"clear"}
			],
			[
				{title:"a",value:"a",bg:"green"},
				{title:"b",value:"b",bg:"green"},
				{title:"c",value:"c",bg:"green"},
				{title:"d",value:"d",bg:"green"},
				{title:"e",value:"e",bg:"green"},
				{title:"f",value:"f",bg:"green"},
				{title:"g",value:"g",bg:"green"},
				{title:"h",value:"h",bg:"green"},
				{title:"i",value:"i",bg:"green"},
				{title:"j",value:"j",bg:"green"},
				{title:"k",value:"k",bg:"green"},
				{title:"m",value:"m",bg:"green"},
				{title:"l",value:"l",bg:"green"}
			],
			[
				{title:"n",value:"n",bg:"green"},
				{title:"o",value:"o",bg:"green"},
				{title:"p",value:"p",bg:"green"},
				{title:"q",value:"q",bg:"green"},
				{title:"r",value:"r",bg:"green"},
				{title:"s",value:"s",bg:"green"},
				{title:"t",value:"t",bg:"green"},
				{title:"u",value:"u",bg:"green"},
				{title:"v",value:"v",bg:"green"},
				{title:"w",value:"w",bg:"green"},
				{title:"x",value:"x",bg:"green"},
				{title:"y",value:"y",bg:"green"},
				{title:"z",value:"z",bg:"green"}
			]
		];

		var userOptions = jQuery.extend({
			//Default plugin properties
			title: "ПОЖАЛУЙСТА,<br>ВВЕДИТЕ РЕГИСТРАЦИОННЫЙ НОМЕР АВТОМОБИЛЯ",
			keyboardId:"keyboard",
			checkPatterns:[
				"^([A-Z0-9]{4,9})$"
			]
		},options);

		var keyboardObj = new Keyboard(this.eq(0),userOptions);

		keyboardObj.initPluginBlock();

		keyboardObj.initPluginKeyboard(buttons);

		return keyboardObj;
	};






	jQuery.fn.keyboard_card = function(options){

		var buttons = [
			[
				{title:"1",value:"1",bg:"blue"},
				{title:"2",value:"2",bg:"blue"},
				{title:"3",value:"3",bg:"blue"},
				{title:"4",value:"4",bg:"blue"},
				{title:"5",value:"5",bg:"blue"},
				{title:"c",value:"clear",bg:"clear"}
			],
			[
				{title:"6",value:"6",bg:"blue"},
				{title:"7",value:"7",bg:"blue"},
				{title:"8",value:"8",bg:"blue"},
				{title:"9",value:"9",bg:"blue"},
				{title:"0",value:"0",bg:"blue"},
				{title:"&lt;",value:"back",bg:"back"}
			]
		];

		var userOptions = jQuery.extend({
			//Default properties
			title: "ПОЖАЛУЙСТА,<br>ВВЕДИТЕ бизнес номер карты",
			keyboardId:"keyboard_card"
		},options);

		var keyboardObj = new Keyboard(this.eq(0),userOptions);

		keyboardObj.initPluginBlock();

		keyboardObj.initPluginKeyboard(buttons);

		return keyboardObj;
	};







	jQuery.fn.keyboard_ru = function(options){
		
		var userOptions = jQuery.extend({
			//Default properties
			//Default properties
			title: "ПОЖАЛУЙСТА,<br>ВВЕДИТЕ РЕГИСТРАЦИОННЫЙ НОМЕР АВТОМОБИЛЯ",
			inputId:"keyboard_textbox",
			keyboardId:"keyboard_ru",
			isRuType:true,
			checkPatterns:[
				"^([А-Я]{1,1})([0-9]{3,3})([А-Я]{2,2})([17]?[0-9]{2})$",
				"^([А-Я]{2,2})([0-9]{3,3})([А-Я]{1,1})([17]?[0-9]{2})$",
				"^([0-9]{4,4})([А-Я]{2,2})([17]?[0-9]{2})$",
				"^(([А-Я]{2,2})([0-9]{3,3}))([17]?[0-9]{2})$"
			],
			ruPattern:"^([А-Я0-9]{5,6})([17]?[0-9]{1,2})$"
		},options);

		var buttons = [
			[
				{title:"1",value:"1",bg:"blue"},
				{title:"2",value:"2",bg:"blue"},
				{title:"3",value:"3",bg:"blue"},
				{title:"4",value:"4",bg:"blue"},
				{title:"5",value:"5",bg:"blue"},
				{title:"а",value:"а",bg:"green"},
				{title:"в",value:"в",bg:"green"},
				{title:"с",value:"с",bg:"green"},
				{title:"е",value:"е",bg:"green"},
				{title:"н",value:"н",bg:"green"},
				{title:"к",value:"к",bg:"green"},
				{title:"c",value:"clear",bg:"clear"}
			],
			[
				{title:"6",value:"6",bg:"blue"},
				{title:"7",value:"7",bg:"blue"},
				{title:"8",value:"8",bg:"blue"},
				{title:"9",value:"9",bg:"blue"},
				{title:"0",value:"0",bg:"blue"},
				{title:"м",value:"м",bg:"green"},
				{title:"о",value:"о",bg:"green"},
				{title:"р",value:"р",bg:"green"},
				{title:"т",value:"т",bg:"green"},
				{title:"х",value:"х",bg:"green"},
				{title:"у",value:"у",bg:"green"},
				{title:"&lt;",value:"back",bg:"back"}
			]
		];


		var keyboardObj = new Keyboard(this.eq(0),userOptions);

		keyboardObj.initPluginBlockForRu();

		var keyboardBlock = keyboardObj.initPluginKeyboard(buttons);
		
		return keyboardObj;
	};

})(jQuery);