(function($){
	jQuery.fn.keyboard = function(options){
		var block = this.eq(0);
		if(!block.length) return;
		block.html("");
		block.addClass("keyboard-block");
		options = jQuery.extend({
			//Default properties
			title: "ПОЖАЛУЙСТА,<br>ВВЕДИТЕ РЕГИСТРАЦИОННЫЙ НОМЕР АВТОМОБИЛЯ",
			buttons_bg:"blue",
			checkPatterns:{}
		},options);

		block.append($("<h3/>").html(options.title));
		var field = $("<div/>").attr("id","keyboard-field");
		var input = $("<div/>").attr("id","input");
		var oInput = $("<input/>").attr("type","text")
									.attr("name","code")
									.attr("id","input")
									.attr('tabIndex', '-1')
									.attr('autocomplete', 'off');
		field.append(input.append(oInput));
		block.append(field);

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

		var keyboardBlock = $("<div/>").attr("id","keyboard").addClass("keyboard");
		
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
		

		block.append(keyboardBlock);

		keyboardBlock.find("li").click(function(event){
				var v = $(this).attr("data-value");
				var input = $("#keyboard-field input");
				var value = input.val();
				
				if(v == "back"){
					var l = value.length;
					if(!l) return;
					input.val(value.substring(0,l-1));
				}else if(v == "clear"){
					input.val("");
				}else{
					value +=v;
					input.val(value);
				}
		});

		return block;
	};






	jQuery.fn.keyboard_ru = function(options){
		var block = this.eq(0);
		if(!block.length) return;
		block.html("");
		block.addClass("keyboard-block");
		options = jQuery.extend({
			//Default properties
			title: "ПОЖАЛУЙСТА,<br>ВВЕДИТЕ РЕГИСТРАЦИОННЫЙ НОМЕР АВТОМОБИЛЯ",
			buttons_bg:"blue",
			checkPatterns:{}
		},options);
		block.append($("<h3/>").html(options.title));
		var keyboard_field = $("<div/>").attr("id","keyboard_ru-field");
		var field = $("<div/>").attr("id","field");
		var field_wrapper = $("<div/>").attr("id","field-wrapper");
		var base_part = $("<div/>").attr("id","base_part");
		var region_part = $("<div/>").attr("id","region_part");
		 
		
		var inputLetter = $("<input/>").attr("type","text").attr("name","letter").attr("placeholder","A").attr("maxlength","1");
		var inputNumber = $("<input/>").attr("type","text").attr("name","number").attr("placeholder","777").attr("maxlength","3");
		var inputLetters = $("<input/>").attr("type","text").attr("name","letters").attr("placeholder","AA").attr("maxlength","2");
		var inputRegion = $("<input/>").attr("type","text").attr("name","region").attr("placeholder","777").attr("maxlength","3");
		
		base_part.append(inputLetter).append(inputNumber).append(inputLetters);
		region_part.append(inputRegion);

		field_wrapper.append(base_part).append(region_part);
		field.append(field_wrapper);
		keyboard_field.append(field).append($("<p/>").attr("id","keyboard_ru-info").html("Используйте клавиатуру на экране"));
		block.append(keyboard_field);

		var buttons = [
			[
				{title:"1",value:"1",bg:"blue"},
				{title:"2",value:"2",bg:"blue"},
				{title:"3",value:"3",bg:"blue"},
				{title:"4",value:"4",bg:"blue"},
				{title:"5",value:"5",bg:"blue"},
				{title:"a",value:"a",bg:"green"},
				{title:"b",value:"b",bg:"green"},
				{title:"c",value:"c",bg:"green"},
				{title:"e",value:"e",bg:"green"},
				{title:"k",value:"k",bg:"green"},
				{title:"m",value:"m",bg:"green"},
				{title:"c",value:"clear",bg:"clear"}
			],
			[
				{title:"6",value:"6",bg:"blue"},
				{title:"7",value:"7",bg:"blue"},
				{title:"8",value:"8",bg:"blue"},
				{title:"9",value:"9",bg:"blue"},
				{title:"0",value:"0",bg:"blue"},
				{title:"o",value:"o",bg:"green"},
				{title:"h",value:"h",bg:"green"},
				{title:"p",value:"p",bg:"green"},
				{title:"t",value:"t",bg:"green"},
				{title:"x",value:"x",bg:"green"},
				{title:"y",value:"y",bg:"green"},
				{title:"&lt;",value:"back",bg:"back"}
			]
		];

		var keyboardBlock = $("<div/>").attr("id","keyboard_ru").addClass("keyboard");
		
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
		

		block.append(keyboardBlock);

		keyboardBlock.find("li").click(function(event){
				var v = $(this).attr("data-value");
				var input = $("#keyboard_ru-field input");
				var value = input.val();
				
				if(v == "back"){
					var l = value.length;
					if(!l) return;
					input.val(value.substring(0,l-1));
				}else if(v == "clear"){
					input.val("");
				}else{
					value +=v;
					input.val(value);
				}
		});

		return block;
	};








	jQuery.fn.keyboard_card = function(options){
		var block = this.eq(0);
		if(!block.length) return;
		block.html("");
		block.addClass("keyboard-block");
		options = jQuery.extend({
			//Default properties
			title: "ПОЖАЛУЙСТА,<br>ВВЕДИТЕ бизнес номер карты",
			buttons_bg:"blue",
			checkPatterns:{}
		},options);
		block.append($("<h3/>").html(options.title));
		var field = $("<div/>").attr("id","keyboard_card-field");
		var input = $("<div/>").attr("id","input");
		var oInput = $("<input/>").attr("type","text").attr("name","code").attr("id","input");
		field.append(input.append(oInput));
		field.append($("<p/>").attr("id","keyboard_card-info").html("Используйте клавиатуру на экране"));
		block.append(field);

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

		var keyboardBlock = $("<div/>").attr("id","keyboard_card").addClass("keyboard");
		
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
		

		block.append(keyboardBlock);

		keyboardBlock.find("li").click(function(event){
				var v = $(this).attr("data-value");
				var input = $("#keyboard_card-field input");
				var value = input.val();
				
				if(v == "back"){
					var l = value.length;
					if(!l) return;
					input.val(value.substring(0,l-1));
				}else if(v == "clear"){
					input.val("");
				}else{
					value +=v;
					input.val(value);
				}
		});

		return block;
	};
})(jQuery);