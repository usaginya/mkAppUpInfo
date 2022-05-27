function mkSearchAnswer(){
	let questId = $(this).attr('question');
	if(!questId || $(this).find('.mkAnswer').length > 0) return;
	mkGetAnswer(questId, mkSetAnswer, this);
}

$('.questioncard').click(mkSearchAnswer)

function mkSetAnswer(answer, questDom){
	if(!answer) return;
	let answerList = answer.split(',');
	$.map(answerList, function(v){
		$(questDom).find(`[choice="${v}"]`).addClass('mkAnswer')
	});
}

function mkGetAnswer(questId, callbk, questDom) {
	$.post('Daily', {
		'type': 'ckda',
		'question': questId
	}, function (data, status) {
		if(status != 'success') return;
		try{
			let json = $.parseJSON(data)[0];
			if(callbk) callbk(json.Answer, questDom);
		}catch(err){
			console.error(`获取答案失败！题目id: ${questId}`, err);
		}
	});
};

$('head').append('<style>.mkAnswer{border-left:6px solid #ffcbdc!important;border-radius:10px}</style>');
alert('现在！用魔法战胜魔法！');