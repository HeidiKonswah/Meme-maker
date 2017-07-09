function textChangeListener(e){
				var id = e.target.id;
				var val = e.target.value;
				
				if (id == "topLineText") {
					window.topLineText = val;
				}else{
					window.bottomLineText = val;
				}
				
				redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
			}
			
			
			function redrawMeme(imageSrc, topLine, bottomLine) {
				var c = document.querySelector('canvas');
				var ctx= c.getContext("2d");
				
				ctx.drawImage(imageSrc,0,0,c.width,c.height);
				
				// font settings
				ctx.font= "36pt impact";
				ctx.textAlign = "center";
				ctx.fillStyle = "white";
				ctx.strokeStyle = "black";
				ctx.lineWidth = "3";
				
				ctx.fillText(topLine,c.width/2, 40);
				ctx.strokeText(topLine,c.width/2, 40);
				
				ctx.fillText(bottomLine, c.width/2,450);
				ctx.strokeText(bottomLine, c.width/2,450);
				
				
				
			}
			
			function saveFile() {
				window.open(document.querySelector('canvas').toDataURL());
			}
			
			function handleFileSelect(evt) {
					var canvasWidth = 500;
					var canvasHeight = 500;
					var file = evt.target.files[0];
      
      
      
				  var reader = new FileReader();
				  reader.onload = function(fileObject) {
					var data = fileObject.target.result;
					
					// Create an image object
					var image = new Image();
					image.onload = function() {
					  
					  window.imageSrc = this;
					  redrawMeme(window.imageSrc, " ", " ");
					}
					
					// Set image data to background image.
					image.src = data;
					console.log(fileObject.target.result);
				  };
				  reader.readAsDataURL(file)
			}
			
			window.topLineText= " ";
			window.bottomLineText= " ";
			var input1 = document.getElementById('topLineText');
			var input2 = document.getElementById('bottomLineText');
			input1.oninput = textChangeListener;
			input2.oninput = textChangeListener;
			document.getElementById('file').addEventListener('change', handleFileSelect, false);
			document.querySelector('button').addEventListener('click', saveFile, false);