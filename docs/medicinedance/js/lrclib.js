function randColor(){
	var red = parseInt(Math.random()*156+80).toString();
	var blue = parseInt(Math.random()*156+80).toString();
	var green= parseInt(Math.random()*156+80).toString();
	return 'rgb('+red+','+blue+','+green+')';
}
function randFontsize(){
	return parseInt(Math.random()*16+10).toString() + 'pt';
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
			$(lrcBox).fadeTo(280,0.1,function(){

				var	fontSize = randFontsize();
				var	fShadow = randColor();
				fShadow = fShadow + ' 0px 0px 5px,' + fShadow + ' 0px 0px 10px,' + fShadow + ' 0px 0px 15px,' + fShadow + ' 0px 0px 20px, '+fShadow+' 0px 0px 5px';
				$(lrcBox).css({'font-size':fontSize,'text-shadow':fShadow});

				var	maxLeft = window.innerWidth - lrcBox.width();
				var	maxTop = window.innerHeight - lrcBox.height();
				var	leftPos = Math.floor(Math.random() * (maxLeft + 1));
				var	topPos = Math.floor(Math.random() * (maxTop + 1));
				$(lrcBox).css({ left:leftPos, top:topPos});
			});
		else{
			$(lrcBox).fadeTo(300,1);
		}
	},

	showLrc: function(id,url) {
		var request = new XMLHttpRequest();
		//'./content/songs/foo.lrc'
		request.open('GET', url, true);
		request.responseType = 'text';
		request.onload = function() {
			var lrc = request.response;
			lrc = lrclib.parseLrc(lrc);

			var audio = document.getElementsByTagName('audio')[0],
				lrcBox = document.getElementById(id);
			if(!lrcBox) return;

			lrclib.moveLrc(id,1);
			audio.addEventListener("timeupdate",function(){
				for (var i = 0, l = lrc.length; i < l; i++) {
					if (this.currentTime> lrc[i][0] && this.currentTime < lrc[i][0]+0.25) {
						lrcBox.textContent = lrc[i][1];
						lrclib.moveLrc(id,0);
					}
					else if( i<l-1 && this.currentTime> lrc[i+1][0]-0.5 && this.currentTime < lrc[i+1][0]-0.3)
						lrclib.moveLrc(id,1);
				}
			});
		};
		request.send();
	}
};