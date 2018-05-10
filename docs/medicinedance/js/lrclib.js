/*
 * by YIU
 * last 20180510.18
 */
function randColor(){
	var red = parseInt(Math.random()*156+80).toString();
	var blue = parseInt(Math.random()*156+80).toString();
	var green= parseInt(Math.random()*156+80).toString();
	return 'rgb('+red+','+blue+','+green+')';
}
function randFontsize(){
	return parseInt(Math.random()*16+10).toString() + 'pt';
}

function randSort(maxval){
	if(maxval<1) return 0;
	var array = new Array(Math.floor(maxval))
	.fill(0)
	.map((v,i)=>i+1)
	.sort(()=>0.5 - Math.random())
	.filter((v,i)=>i<10);
	return array[0];
}

var lrclib = {
	parseLrc: function(text) {
		var lines = text.split('\n'),
			pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
			result = [];
		while (!pattern.test(lines[0])) {
			lines = lines.slice(1);
		}
		lines[lines.length - 1].length === 0 && lines.pop();
		lines.forEach(function(v , i , a ) {
			var time = v.match(pattern),
				value = v.replace(pattern, '');
			time.forEach(function(v1, i1, a1) {
				var t = v1.slice(1, -1).split(':');
				result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
			});
		});
		result.sort(function(a, b) {
			return a[0] - b[0];
		});
		return result;
	},

	moveLrc: function(id,fout) {
		var lrcBox = $('#'+id);
		if(fout)
			$(lrcBox).fadeOut(280,function(){

				var	fontSize = randFontsize();
				var	fShadow = randColor();
				fShadow = fShadow + ' 0px 0px 5px,' + fShadow + ' 0px 0px 10px,' + fShadow + ' 0px 0px 15px,' + fShadow + ' 0px 0px 20px, '+fShadow+' 0px 0px 5px';
				lrcBox.css({'display':'block','opacity':'0','font-size':fontSize,'text-shadow':fShadow});

				var fixedLeft = window.innerWidth-640;
				var fixedTop = window.innerHeight-100;
				var	maxLeft = window.innerWidth - lrcBox.width();
				maxLeft = maxLeft>fixedLeft ? fixedLeft : maxLeft;
				var	maxTop = window.innerHeight - lrcBox.height();
				maxTop = maxTop>fixedTop ? fixedTop : maxTop;
				var	leftPos = Math.floor(randSort(maxLeft));
				var	topPos = Math.floor(randSort(maxTop));
				lrcBox.css({ left:leftPos, top:topPos });
			});
		else{
			lrcBox.fadeTo(300,1);
		}
	},

	showLrc: function(id,url,extxt='',exurl='') {
		var request = new XMLHttpRequest();
		//'./content/songs/foo.lrc'
		request.open('GET', url, true);
		request.responseType = 'text';
		request.onload = function() {
			var lrc = request.response;
			lrc = lrclib.parseLrc(lrc);

			var audio = document.getElementsByTagName('audio')[0],
				lrcBox = document.getElementById(id);
			var lrcBoxlink = $('#lrcbox2').parent('a');
			if(!lrcBox) return;

			lrclib.moveLrc(id,1);
			audio.addEventListener("timeupdate",function(){
				for (var i = 0, l = lrc.length; i < l; i++) {
					if (this.currentTime> lrc[i][0] && this.currentTime < lrc[i][0]+0.3) {
						lrcBox.textContent = lrc[i][1];

						if(lrcBox.textContent.indexOf(extxt)>-1 && exurl)
						{
							lrcBoxlink.attr('bakdata',lrcBoxlink.attr('href'));
							lrcBoxlink.attr('href',exurl);
						}else if(typeof(lrcBoxlink.attr("bakdata"))!="undefined")
						{
							lrcBoxlink.attr('href',lrcBoxlink.attr('bakdata'));
							lrcBoxlink.removeAttr('bakdata');
						}
						lrclib.moveLrc(id,0);
					}
					else if( i<l-1 && this.currentTime> lrc[i+1][0]-1 && this.currentTime < lrc[i+1][0]-0.4)
						lrclib.moveLrc(id,1);
				}
			});
		};
		request.send();
	}
};