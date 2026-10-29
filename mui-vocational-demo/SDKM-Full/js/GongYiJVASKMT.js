mui.plusReady(function () {

	function GongYiList(){

		mui.ajax(http + '/api/activity/list',{
			data:{

			},
			headers:{
				'Authorization':localStorage.getItem('token')
			},

			dataType:'json',
			type:'GET',
			timeout:10000,
			success:function(data){

				if(data.code == 200){

					var ListHTMl = '';

					for (var i = 0 ; i < data.rows.length ; i++) {

						ListHTMl += `<div style="padding: 3px; border-radius: 10px; background-color: #222222;">
					<img src="${httpimg + data.rows[i].imgUrl}" style="height: 200px; width: 100%;">
					<div style="padding: 5px;">

						<h4 style="color: #FFFFFF;">${data.rows[i].activityName}</h4>
						<h5 style="color: #E0E0E0;">${data.rows[i].startEndTime}</h5>
						<h5 style="color: #E0E0E0;" class="mui-ellipsis">${data.rows[i].briefIntroduction}</h5>

					</div>
					<hr >

					<div style="position: relative;">
						<button type="button" class="mui-btn mui-btn-red  mui-media" style="position: absolute;right: 15px; border-radius: 10px;" BaoMingID="${data.rows[i].id}">报名</button>
						<p style="color: #C8C8C8;">人数:${data.rows[i].applyNum}</p>
					</div>

				</div>
				<br>
				`

					}
				document.getElementById('GongYiList').innerHTML = ListHTMl

				var TiaoZuanID = document.querySelectorAll('#GongYiList .mui-media')

				for (var j = 0 ; j < TiaoZuanID.length ; j++) {

					(function(TiaoZiuan){

						TiaoZiuan.addEventListener('tap',function(){

							var id = this.getAttribute('BaoMingID')

							console.log(id)

							plus.storage.setItem('BaoMingID',id);

							mui.openWindow({
								url:'GongYiXiangQingHTML.html',
								id:'GongYiXiangQingHTML',
								extras:{
									id:id,
								},

							})

						})

					})(TiaoZuanID[j])

				}

				}

			},
			error:function(xhr,type,errorThrown){

			}
		});

	}

	window.addEventListener('refresh', function () {
		GongYiList()
	})

	GongYiList()

})

