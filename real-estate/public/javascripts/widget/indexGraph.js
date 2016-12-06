(function($){
  $.fn.indexGraph = function(){
    var chart;
    var Data = {
      0: {
        'chartTitle': '不同房价区间内小区数量',
        'lineChartTitle': '',
        'xAxisTitle': '房价',
        'valueSuffix': '元/平米',
        //'data': [2,12,28,32,35,63,57,36,47,25,20],
        'categories': ['小于1w','1w-2w','2w-3w','3w-4w','4w-5w','5w-6w','6w-7w','7w-8w','8w-9w','9w-10w','大于10w'],
      },
      1: {
        'chartTitle': '不同房龄区间内小区数量',
        'lineChartTitle': '不同房龄区间内小区均价',
        'xAxisTitle': '房龄',
        'valueSuffix': '年',
        //'data': [32,48,45,39,27,20,39],
        'categories': ['0-5','5-10','10-15','15-20','20-25','25-30','>30'],
      },
      2: {
        'chartTitle': '不同容积率区间内小区数量',
        'lineChartTitle': '不同容积率区间内小区均价',
        'xAxisTitle': '容积率',
        'valueSuffix': '百分比',
        //'data': [12,23,34,28,50,8,15,17,32,10],
        'categories': ['0.0-1.0','1.0-1.5','1.5-2.0','2.0-2.5','2.5-3.0','3.0-3.5','3.5-4.0','4.0-4.5','4.5-5.0','>5.0'],
    },
      3: {
        'chartTitle': '不同建筑类型的小区数量',
        'lineChartTitle': '不同建筑类型的小区均价',
        'xAxisTitle': '建筑类型',
        'valueSuffix':'',
        //'data': [10,48,35,28,27,20,39],
        'categories': ['板房','小高层','高层','公寓','联排别墅','双排别墅','花园洋房'],
      },
      4: {
        'chartTitle': '与附近最近商圈不同距离区间小区数量',
        'lineChartTitle': '与附近最近商圈不同距离区间小区均价',
        'xAxisTitle': '与其最近商圈距离',
        'valueSuffix': '米',
        //'data': [48,45,39,27,20,39],
        'categories': ['0-500','500-1000','1000-1500','1500-2000','2000-3000','>3000'],
      }
    };

    //$(document).ready(function(){
      chart = Highcharts.chart('graph-container', {
        title: {
          style: {
            fontWeight: 'bold'
          },
          text: '不同房价区间内小区数量'
        },
        yAxis: {
          title: {
            text: '小区数量'
          }
        },
        xAxis: {
          title: {
            text: '房价'
          },
          categories: ['小于1w','1w-2w','2w-3w','3w-4w','4w-5w','5w-6w','6w-7w','7w-8w','8w-9w','9w-10w','大于10w']
        },
        tooltip: {
          formatter: function(){
            return '房价: ' + this.x + '元/平米' + "<br/>" + "小区数 " + this.y;
          }
        },
        //去掉底部legend
        legend: {
          enabled: false
        },
        series: [{
          name: '小区数量',
          type: 'column',
          //color: '#4572A7',
          colorByPoint:true,
          data: [],
        },{
          name: '小区均价',
          type: 'line',
          data: []
        }]
      });
      //previous version
      /*
        $("ol[name='price']").children().each(function(){
                    var val = $(this).data('value');
                    $(this).on('click',function(){
                      $(this).css({'color':'#4572A7','fontWeight':'bold'});
                      $(this).siblings().each(function(){
                        $(this).css({'color':'','fontWeight':''});
                      })
                       $(this).parent('.sl-value-list').data('price',val);
                       var plotrate = $("ol[name='plot_rate']").data('plotrate');
                       var min_plotrate = +plotrate.split('&')[0];
                       var max_plotrate = +plotrate.split('&')[1];
                       var age = $("ol[name='age']").data('age');
                       var min_year = +age.split('&')[0];
                       var max_year = +age.split('&')[1];
                        var district = $('.aside #district_name').text();
                        var min = +val.split('&')[0];
                        var max = +val.split('&')[1];
                        var byType = $('.attribute-selector').data('chosen');
                        if(byType == 1){
                                $.ajax({
                                         type: "GET",
                                         url: "/getBlocksByTime?district="+district+"&min_price="+min+"&max_price="+max+"&min_plotrate="+min_plotrate+"&max_plotrate="+max_plotrate,
                                         dataType: "json",
                                         success: function(data){
                                              chart.series[0].setData(data.count);
                                              //console.log(data);
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                                });
                                 $.ajax({
                                         type: "GET",
                                         url: "/getBlockListByTime?district="+district+"&min_price="+min+"&max_price="+max+"&min_plotrate="+min_plotrate+"&max_plotrate="+max_plotrate,
                                         dataType: "json",
                                         success: function(data){
                                             $('.blockList .b-hd1_i').text(data.blocklist.length);
                                              $('.b-container .b-content').children().each(function(){
                                                    $(this).remove();
                                              })
                                             for(var i=0;i<data.blocklist.length;i++){
                                                   var block_item = $('<li class="list-item"><div class="item-picture"><img src="http://image1.ljcdn.com/110000-inspection/27a99310-d12f-4a51-930a-c31eac8f2b15.JPG.116x116.jpg" ></div><div class="item-main"><p class="item-title">'+data.blocklist[i].title+'</p><p class="item-des"><span class="item-info">'+data.blocklist[i].address+'</span><span class="item-info">'+data.blocklist[i].build_type+'</span><span class="item-info">'+data.blocklist[i].build_time+'</span><span class="item-price">'+data.blocklist[i].unit_price+'<span>万/平方米</span></span> </p><p class="item-tag-wrap"><span class="item-tag-school item-extra">学区房</span><span class="item-tag-hospital item-extra">近医院</span></p></div></li>');


                                                    $('.b-content').append(block_item);
                                             }
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                        });
                        }else if(byType ==2){
                                $.ajax({
                                         type: "GET",
                                         url: "/getBlocksByPlotRate?district="+district+"&min_price="+min+"&max_price="+max+"&min_year="+min_year+"&max_year="+max_year,
                                         dataType: "json",
                                         success: function(data){
                                              chart.series[0].setData(data.count);
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                              });

                                 $.ajax({
                                         type: "GET",
                                         url: "/getBlockListByPlotRate?district="+district+"&min_price="+min+"&max_price="+max+"&min_year="+min_year+"&max_max="+max_year,
                                         dataType: "json",
                                         success: function(data){
                                             $('.blockList .b-hd1_i').text(data.blocklist.length);
                                              $('.b-container .b-content').children().each(function(){
                                                    $(this).remove();
                                              })
                                             for(var i=0;i<data.blocklist.length;i++){
                                                   var block_item = $('<li class="list-item"><div class="item-picture"><img src="http://image1.ljcdn.com/110000-inspection/27a99310-d12f-4a51-930a-c31eac8f2b15.JPG.116x116.jpg" ></div><div class="item-main"><p class="item-title">'+data.blocklist[i].title+'</p><p class="item-des"><span class="item-info">'+data.blocklist[i].address+'</span><span class="item-info">'+data.blocklist[i].build_type+'</span><span class="item-info">'+data.blocklist[i].build_time+'</span><span class="item-price">'+data.blocklist[i].unit_price+'<span>万/平方米</span></span> </p><p class="item-tag-wrap"><span class="item-tag-school item-extra">学区房</span><span class="item-tag-hospital item-extra">近医院</span></p></div></li>');


                                                    $('.b-content').append(block_item);
                                             }
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                            });
                        }


                    })
        })

        $("ol[name='age']").children().each(function(){
                    var val = $(this).data('value');
                    $(this).on('click',function(){
                      $(this).css({'color':'#4572A7','fontWeight':'bold'});
                      $(this).siblings().each(function(){
                        $(this).css({'color':'','fontWeight':''});
                      })
                       $(this).parent('.sl-value-list').data('age',val);
                       var plotrate = $("ol[name='plot_rate']").data('plotrate');
                       var min_plotrate = +plotrate.split('&')[0];
                       var max_plotrate = +plotrate.split('&')[1];
                       var price = $("ol[name='price']").data('price');
                       var min_price = +price.split('&')[0];
                       var max_price = +price.split('&')[1];
                      var district = $('.aside #district_name').text();
                        var min = +val.split('&')[0];
                        var max = +val.split('&')[1];
                        var byType = $('.attribute-selector').data('chosen');
                        if(byType == 0){
                                $.ajax({
                                         type: "GET",
                                         url: "/getBlocksByPrice?district="+district+"&min_year="+min+"&max_year="+max+"&min_plotrate="+min_plotrate+"&max_plotrate="+max_plotrate,
                                         dataType: "json",
                                         success: function(data){
                                              chart.series[0].setData(data.count);
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                                });

                                $.ajax({
                                         type: "GET",
                                         url: "/getBlockListByPrice?district="+district+"&min_year="+min+"&max_year="+max+"&min_plotrate="+min_plotrate+"&max_plotrate="+max_plotrate,
                                         dataType: "json",
                                         success: function(data){
                                             $('.blockList .b-hd1_i').text(data.blocklist.length);
                                              $('.b-container .b-content').children().each(function(){
                                                    $(this).remove();
                                              })
                                             for(var i=0;i<data.blocklist.length;i++){
                                                   var block_item = $('<li class="list-item"><div class="item-picture"><img src="http://image1.ljcdn.com/110000-inspection/27a99310-d12f-4a51-930a-c31eac8f2b15.JPG.116x116.jpg" ></div><div class="item-main"><p class="item-title">'+data.blocklist[i].title+'</p><p class="item-des"><span class="item-info">'+data.blocklist[i].address+'</span><span class="item-info">'+data.blocklist[i].build_type+'</span><span class="item-info">'+data.blocklist[i].build_time+'</span><span class="item-price">'+data.blocklist[i].unit_price+'<span>万/平方米</span></span> </p><p class="item-tag-wrap"><span class="item-tag-school item-extra">学区房</span><span class="item-tag-hospital item-extra">近医院</span></p></div></li>');


                                                    $('.b-content').append(block_item);
                                             }
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                                });

                        }else if(byType == 2){
                                 $.ajax({
                                         type: "GET",
                                         url: "/getBlocksByPlotRate?district="+district+"&min_year="+min+"&max_year="+max+"&min_price="+min_price+"&max_price="+max_price,
                                         dataType: "json",
                                         success: function(data){
                                              chart.series[0].setData(data.count);
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                              });

                                 $.ajax({
                                         type: "GET",
                                         url: "/getBlockListByPlotRate?district="+district+"&min_year="+min+"&max_year="+max+"&min_price="+min_price+"&max_price="+max_price,
                                         dataType: "json",
                                         success: function(data){
                                             $('.blockList .b-hd1_i').text(data.blocklist.length);
                                              $('.b-container .b-content').children().each(function(){
                                                    $(this).remove();
                                              })
                                             for(var i=0;i<data.blocklist.length;i++){
                                                   var block_item = $('<li class="list-item"><div class="item-picture"><img src="http://image1.ljcdn.com/110000-inspection/27a99310-d12f-4a51-930a-c31eac8f2b15.JPG.116x116.jpg" ></div><div class="item-main"><p class="item-title">'+data.blocklist[i].title+'</p><p class="item-des"><span class="item-info">'+data.blocklist[i].address+'</span><span class="item-info">'+data.blocklist[i].build_type+'</span><span class="item-info">'+data.blocklist[i].build_time+'</span><span class="item-price">'+data.blocklist[i].unit_price+'<span>万/平方米</span></span> </p><p class="item-tag-wrap"><span class="item-tag-school item-extra">学区房</span><span class="item-tag-hospital item-extra">近医院</span></p></div></li>');


                                                    $('.b-content').append(block_item);
                                             }
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                                });

                        }
                    })
        })

        $("ol[name='plot_rate']").children().each(function(){
                    var val = $(this).data('value');
                    $(this).on('click',function(){
                      $(this).css({'color':'#4572A7','fontWeight':'bold'});
                      $(this).siblings().each(function(){
                        $(this).css({'color':'','fontWeight':''});
                      })
                       $(this).parent('.sl-value-list').data('plotrate',val);
                        var age = $("ol[name='age']").data('age');
                       var min_year = +age.split('&')[0];
                       var max_year = +age.split('&')[1];
                       var price = $("ol[name='price']").data('price');
                       var min_price = +price.split('&')[0];
                       var max_price = +price.split('&')[1];
                      var district = $('.aside #district_name').text();
                        var min = +val.split('&')[0];
                        var max = +val.split('&')[1];
                        var byType = $('.attribute-selector').data('chosen');
                        if(byType == 0){
                                $.ajax({
                                         type: "GET",
                                         url: "/getBlocksByPrice?district="+district+"&min_plotrate="+min+"&max_plotrate="+max+"&min_year="+min_year+"&max_year="+max_year,
                                         dataType: "json",
                                         success: function(data){
                                              chart.series[0].setData(data.count);
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                        });

                                $.ajax({
                                         type: "GET",
                                         url: "/getBlockListByPrice?district="+district+"&min_plotrate="+min+"&max_plotrate="+max+"&min_year="+min_year+"&max_year="+max_year,
                                         dataType: "json",
                                         success: function(data){
                                             $('.blockList .b-hd1_i').text(data.blocklist.length);
                                              $('.b-container .b-content').children().each(function(){
                                                    $(this).remove();
                                              })
                                             for(var i=0;i<data.blocklist.length;i++){
                                                   var block_item = $('<li class="list-item"><div class="item-picture"><img src="http://image1.ljcdn.com/110000-inspection/27a99310-d12f-4a51-930a-c31eac8f2b15.JPG.116x116.jpg" ></div><div class="item-main"><p class="item-title">'+data.blocklist[i].title+'</p><p class="item-des"><span class="item-info">'+data.blocklist[i].address+'</span><span class="item-info">'+data.blocklist[i].build_type+'</span><span class="item-info">'+data.blocklist[i].build_time+'</span><span class="item-price">'+data.blocklist[i].unit_price+'<span>万/平方米</span></span> </p><p class="item-tag-wrap"><span class="item-tag-school item-extra">学区房</span><span class="item-tag-hospital item-extra">近医院</span></p></div></li>');


                                                    $('.b-content').append(block_item);
                                             }
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                                });

                        }else if(byType == 1){
                                 $.ajax({
                                         type: "GET",
                                         url: "/getBlocksByTime?district="+district+"&min_plotrate="+min+"&max_plotrate="+max+"&min_price="+min_price+"&max_price="+max_price,
                                         dataType: "json",
                                         success: function(data){
                                              chart.series[0].setData(data.count);
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                              });

                                 $.ajax({
                                         type: "GET",
                                         url: "/getBlockListByTime?district="+district+"&min_plotrate="+min+"&max_plotrate="+max+"&min_price="+min_price+"&max_price="+max_price,
                                         dataType: "json",
                                         success: function(data){
                                             $('.blockList .b-hd1_i').text(data.blocklist.length);
                                              $('.b-container .b-content').children().each(function(){
                                                    $(this).remove();
                                              })
                                             for(var i=0;i<data.blocklist.length;i++){
                                                   var block_item = $('<li class="list-item"><div class="item-picture"><img src="http://image1.ljcdn.com/110000-inspection/27a99310-d12f-4a51-930a-c31eac8f2b15.JPG.116x116.jpg" ></div><div class="item-main"><p class="item-title">'+data.blocklist[i].title+'</p><p class="item-des"><span class="item-info">'+data.blocklist[i].address+'</span><span class="item-info">'+data.blocklist[i].build_type+'</span><span class="item-info">'+data.blocklist[i].build_time+'</span><span class="item-price">'+data.blocklist[i].unit_price+'<span>万/平方米</span></span> </p><p class="item-tag-wrap"><span class="item-tag-school item-extra">学区房</span><span class="item-tag-hospital item-extra">近医院</span></p></div></li>');


                                                    $('.b-content').append(block_item);
                                             }
                                         },
                                         error:function(msg){
                                              console.log(msg);
                                         }
                                });
                        }
                    })
        })
        */

      // var updateData = function(order){
      //   var xAxisTitle = Data[order].xAxisTitle;
      //   chart.setTitle({text: Data[order].chartTitle});
      //   chart.xAxis[0].setTitle({text: xAxisTitle});
      //   chart.xAxis[0].setCategories(Data[order].categories);
      //   chart.series[0].setData(Data[order].data);
      //   chart.tooltip.options.formatter = function () {
      //     return xAxisTitle + ": " + this.x + Data[order].valueSuffix + '<br/>' + this.series.name + ": " +this.y;
      //   };

      /*重写此方法,通过ajax获取mysql中的数据
        var updateData = function(order){
                var xAxisTitle = Data[order].xAxisTitle;
                chart.setTitle({text: Data[order].chartTitle});
                chart.xAxis[0].setTitle({text: xAxisTitle});
                chart.xAxis[0].setCategories(Data[order].categories);

                var district = $('.aside #district_name').text();
                console.log(district);


                if(order == 0){   //均价
                  $.ajax({
                               type: "GET",
                               url: "/getBlocksByPrice?district="+district,
                               dataType: "json",
                               success: function(data){
                                    chart.series[0].setData(data.count);
                               },
                               error:function(msg){
                                    console.log(msg);
                               }
                 });
                }else if(order == 1){     //房龄
                  $.ajax({
                               type: "GET",
                               url: "/getBlocksByTime?district="+district,
                               dataType: "json",
                               success: function(data){
                                    chart.series[0].setData(data.count);
                               },
                               error:function(msg){
                                    console.log(msg);
                               }
                 });
                }else if(order == 2){    //容积率
                    $.ajax({
                               type: "GET",
                               url: "/getBlocksByPlotRate?district="+district,
                               dataType: "json",
                               success: function(data){
                                    chart.series[0].setData(data.count);
                               },
                               error:function(msg){
                                    console.log(msg);
                               }
                 });
                }

                //建筑类型、距商圈距离这两个比较难，交给你们了哈～_～

        chart.tooltip.options.formatter = function () {
          return xAxisTitle + ": " + this.x + Data[order].valueSuffix + '<br/>' + this.series.name + ": " +this.y;
        };

      };
      */

      //区域选择器发生变化，更新数据
      $("ol[class='drop-list']").children().each(function(){
        $(this).click(function(){
          newUpdateData();
        })
      })

      //维度区间发生变化，更新数据
      $("ol[name='price']").children().each(function(){
                  var val = $(this).data('value');
                  $(this).on('click',function(){
                    $(this).css({'color':'#4572A7','fontWeight':'bold'});
                    $(this).siblings().each(function(){
                      $(this).css({'color':'','fontWeight':''});
                    })
                     $(this).parent('.sl-value-list').data('price',val);
                     newUpdateData();
                  })
      })
      $("ol[name='age']").children().each(function(){
                  var val = $(this).data('value');
                  $(this).on('click',function(){
                    $(this).css({'color':'#4572A7','fontWeight':'bold'});
                    $(this).siblings().each(function(){
                      $(this).css({'color':'','fontWeight':''});
                    })
                     $(this).parent('.sl-value-list').data('age',val);
                     newUpdateData();
                  })
      })
      $("ol[name='plot_rate']").children().each(function(){
                  var val = $(this).data('value');
                  $(this).on('click',function(){
                    $(this).css({'color':'#4572A7','fontWeight':'bold'});
                    $(this).siblings().each(function(){
                      $(this).css({'color':'','fontWeight':''});
                    })
                     $(this).parent('.sl-value-list').data('plotrate',val);
                     newUpdateData();
                  })
      })

      //维度发生变化，更新数据
      $('.attribute-selector li').click(function(){
        $(this).addClass('chosen');
        $(this).siblings().removeClass('chosen');
        var order = $(this).attr("value");
        /*
        if (order === 0) {
          $('.index-y-selector #avg_price').addClass('hidden');
        }else{
          $('.index-y-selector #avg_price').removeClass('hidden');
        }
      })
    });

    

    // var updateData = function(order){
    //   var xAxisTitle = Data[order].xAxisTitle;
    //   chart.setTitle({text: Data[order].chartTitle});
    //   chart.xAxis[0].setTitle({text: xAxisTitle});
    //   chart.xAxis[0].setCategories(Data[order].categories);
    //   chart.series[0].setData(Data[order].data);
    //   chart.tooltip.options.formatter = function () {
    //     return xAxisTitle + ": " + this.x + Data[order].valueSuffix + '<br/>' + this.series.name + ": " +this.y;
    //   };

    //重写此方法,通过ajax获取mysql中的数据
      var updateData = function(order){
              var xAxisTitle = Data[order].xAxisTitle;
              chart.setTitle({text: Data[order].chartTitle});
              chart.xAxis[0].setTitle({text: xAxisTitle});
              chart.xAxis[0].setCategories(Data[order].categories);

              var district = $('.aside #district_name').text();
              console.log(district);

              
              if(order == 0){   //均价
                $.ajax({
                             type: "GET",
                             url: "/getBlocksByPrice?district="+district,   
                             dataType: "json",
                             success: function(data){
                                  chart.series[0].setData(data.count);
                             },
                             error:function(msg){
                                  console.log(msg);
                             }
               });
              }else if(order == 1){     //房龄
                $.ajax({
                             type: "GET",
                             url: "/getBlocksByTime?district="+district,    
                             dataType: "json",
                             success: function(data){              
                                  chart.series[0].setData(data.count);
                             },
                             error:function(msg){
                                  console.log(msg);
                             }
               });
              }else if(order == 2){    //容积率
                  $.ajax({
                             type: "GET",
                             url: "/getBlocksByPlotRate?district="+district,   
                             dataType: "json",
                             success: function(data){                             
                                  chart.series[0].setData(data.count);
                             },
                             error:function(msg){
                                  console.log(msg);
                             }
               });
              }
      
              //建筑类型、距商圈距离这两个比较难，交给你们了哈～_～
              
      chart.tooltip.options.formatter = function () {
        return xAxisTitle + ": " + this.x + Data[order].valueSuffix + '<br/>' + this.series.name + ": " +this.y;
      };

        */
        $(this).parent(".attribute-selector").data('chosen',order);
        $('.indexGraph .attribute-filter').children().each(function(){
          if($(this).data('value')==order){
            $(this).addClass('hidden');
            $(this).siblings().each(function(){
              $(this).removeClass('hidden');
            })
          }
        })
        //updateData(order);
        newUpdateData();
      });


    //2016-12-03 重写updateData
    function newUpdateData() {
      //获取区域名称 后期可能去掉
      var district = $('.aside #district_name').text();
      console.log("重写updateData，选择区域:"+district);
      //获取选择的维度 0-房价,1-房龄,2-容积率
      var attribute = $('.indexGraph .attribute-selector').data('chosen');
      console.log("重写updateData，选择维度:"+attribute);
      //获取维度区间
      var age, price, plotrate;
      var min_age,min_price,min_plotrate,max_age,max_price,max_plotrate;
      //根据选择的标准重写chart属性
      var chartType = $('.index-y-selector').data('chosen');
      switch (chartType) {
        case 0:
          chart.setTitle({text: Data[attribute].chartTitle});
          //chart.yAxis.setTitle({text:"y1"});
          //重写chart tooltip
          chart.tooltip.options.formatter = function () {
            return xAxisTitle + ": " + this.x + Data[attribute].valueSuffix + '<br/>' + this.series.name + ": " +this.y;
          };
          break;
        case 1:
          console.log("更改title:"+Data[attribute].lineChartTitle);
          chart.setTitle({text: Data[attribute].lineChartTitle});
          chart.yAxis[0].setTitle({text:"小区均价"});
          //重写chart tooltip
          chart.tooltip.options.formatter = function () {
            return xAxisTitle + ": " + this.x + Data[attribute].valueSuffix + '<br/>' + this.series.name + ": " +this.y+"元/平米";
          };
          break;
        default:
          break;
      }
      var xAxisTitle = Data[attribute].xAxisTitle;
      chart.xAxis[0].setTitle({text: xAxisTitle});
      chart.xAxis[0].setCategories(Data[attribute].categories);
      //ajax url
      var url="";
      //需要判断区域未选择或选择为不限
      switch (attribute) {
        //选择房价
        case 0:
          age = $("ol[name='age']").data('age');
          plotrate = $("ol[name='plot_rate']").data('plotrate');
          if (age===""&&plotrate==="") {
            url = "/getBlocksByPrice?district="+district;
          }else if (age===""&&plotrate!=="") {
            min_plotrate = plotrate.split("&")[0];
            max_plotrate = plotrate.split("&")[1];
            url = "/getBlocksByPrice?district="+district+"&min_plotrate="+min_plotrate+"&max_plotrate="+max_plotrate;
          }else if (age!==""&&plotrate==="") {
            min_age = age.split("&")[0];
            max_age = age.split("&")[1];
            url = "/getBlocksByPrice?district="+district+"&min_year="+min_age+"&max_year="+max_age;
          }else {
            min_age = age.split("&")[0];
            max_age = age.split("&")[1];
            min_plotrate = plotrate.split("&")[0];
            max_plotrate = plotrate.split("&")[1];
            url = "/getBlocksByPrice?district="+district+"&min_year="+min_age+"&max_year="+max_age+"&min_plotrate="+min_plotrate+"&max_plotrate"+max_plotrate;
          }
          sendAjaxRequest(url);
          break;
        //选择房龄
        case 1:
          price = $("ol[name='price']").data('price');
          plotrate = $("ol[name='plot_rate']").data('plotrate');
          if (price===""&&plotrate==="") {
            url = "/getBlocksByTime?district="+district;
          }else if (price===""&&plotrate!=="") {
            min_plotrate = plotrate.split("&")[0];
            max_plotrate = plotrate.split("&")[1];
            url = "/getBlocksByTime?district="+district+"&min_plotrate="+min_plotrate+"&max_plotrate="+max_plotrate;
          }else if (price!==""&&plotrate==="") {
            min_price = price.split("&")[0];
            max_price = price.split("&")[1];
            url = "/getBlocksByTime?district="+district+"&min_price="+min_price+"&max_price="+max_price;
          }else {
            min_price = price.split("&")[0];
            max_price = price.split("&")[1];
            min_plotrate = plotrate.split("&")[0];
            max_plotrate = plotrate.split("&")[1];
            url = "/getBlocksByTime?district="+district+"&min_price="+min_price+"&max_price="+max_price+"&min_plotrate="+min_plotrate+"&max_plotrate="+max_plotrate;
          }
          sendAjaxRequest(url);
          break;
        //选择容积率
        case 2:
          price = $("ol[name='price']").data('price');
          age = $("ol[name='age']").data('age');
          if (price===""&&age==="") {
            url = "/getBlocksByPlotRate?district="+district;
          }else if (price===""&&age!=="") {
            min_age = age.split("&")[0];
            max_age = age.split("&")[1];
            url = "/getBlocksByPlotRate?district="+district+"&min_year="+min_age+"&max_year="+max_age;
          }else if (price!==""&&age==="") {
            min_price = price.split("&")[0];
            max_price = price.split("&")[1];
            url = "/getBlocksByPlotRate?district="+district+"&min_price="+min_price+"&max_price="+max_price;
          }else {
            min_price = price.split("&")[0];
            max_price = price.split("&")[1];
            min_age = age.split("&")[0];
            max_age = age.split("&")[1];
            url = "/getBlocksByPlotRate?district="+district+"&min_price="+min_price+"&max_price="+max_price+"&min_year="+min_age+"&max_year="+max_age;
          }
          sendAjaxRequest(url);
          break;
        case 3:
          console.log("下个版本开发建筑类型维度");
          break;
        case 4:
          console.log("下个版本开发距商圈距离维度");
          break;
        default:
          console.log("维度选择错误");
          break;
      }

      //获取选择的指标，小区数量柱状图，平均价格折线图
    }

    /*第一次加载首页
    function initData(attribute){
      var url = '/getBlocksByPriceAll';
      sendAjaxRequest(url);
    }
    */

    //发送ajax请求，简单封装
    function sendAjaxRequest(url){
      $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function(data){
          console.log(url);
          if (url.startsWith("/getBlocksBy")) {
            console.log("小区数量数组:"+data.count);
            console.log("平均房价数组:"+data.avg_price);
            chart.series[0].setData(data.count);
            chart.series[1].setData(data.avg_price);
          }
          /*留作以后优化这个封装函数时使用
          if (url.startsWith("/getBlockListBy")) {

          }
          */
        },
        error:function(msg){
          console.log(msg);
        }
      });
    }


    //指标选择(Y轴)
    $('.index-y-selector li').click(function () {
      $(this).addClass('chosen');
      $(this).siblings().removeClass('chosen');
      var index = $(this).attr('value');
      $(this).parent('.index-y-selector').data('chosen',index);
      console.log("Y轴因子选择:"+index);
      newUpdateData();
      console.log("根据选择指标更新数据完毕");
      switch (index) {
        case 0:
          chart.series[index].show();
          chart.series[1].hide();
          break;
        case 1:
          chart.series[index].show();
          chart.series[0].hide();
          break;
        default:
          console.log("其他指标尚在研讨");
          break;
      }
    })
    chart.series[1].hide();
    newUpdateData();
  }
})(jQuery);
