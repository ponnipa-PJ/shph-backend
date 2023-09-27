// Credit By <script src="https://เธฃเธฑเธเน€เธเธตเธขเธเนเธเธฃเนเธเธฃเธก.net/picker_date/picker_date.js"></script>

function picker_date(element,option)
{
    $(element).prop("readonly",true);
    $(element).css("background-color","white"); 
	
    let ran_cal_id=null;
    
    ran_cal_id=Math.random()*200000;
    ran_cal_id=ran_cal_id.toString().split(".")[0];
    ran_cal_id="cal"+ran_cal_id;

    while($("."+ran_cal_id).length!=0)
    {
        ran_cal_id=Math.random()*200000;
        ran_cal_id=ran_cal_id.toString().split(".")[0];
        ran_cal_id="cal"+ran_cal_id;
    }

    $(element).attr("data-picker",ran_cal_id);
    $(element).addClass(ran_cal_id);
	
    var sel_pic_cal=function(ran_cal_id,td)
    {
       
        let date=$(td).html();
        if(date=="")
        {
            return;
        }
       
        let m=$("[data-picker="+ran_cal_id+"]").next().find(".month_select").val();
        let y=parseInt($("[data-picker="+ran_cal_id+"]").next().find(".year_select").val())+543;
        y=y.toString();
       
        date=date+"/"+m+"/"+y;
       

        $("[data-picker="+ran_cal_id+"]").val(date);
        $("[data-picker="+ran_cal_id+"]").attr("sel_val",date);
        $("[data-picker="+ran_cal_id+"]").next().remove();
        

                        if(option.onchange!=null)
                        {
                            option.onchange(date);
                        }
    }

   var render_cal_pic=function(element,month,year)
   {
	   var d = $(element).val()
	var streetaddress = String(d);
    var d = streetaddress.substring(0, streetaddress.indexOf("/"));
    var m = streetaddress.substring(5, streetaddress.indexOf("/"));
    m = m.substring(1, 3);
    var y = parseInt(streetaddress.substring(6))-543;
    var full = y + "/" + m +"/"+ d;
       
                    let html;

                    html="";

                    html+="<table class='table table-sm' >";

                    html+="<thead>";

                        html+="<tr>";

                        
                        
                            html+="<th style='text-align: center'>อา</th>";
                            html+="<th style='text-align: center'>จ</th>";
                            html+="<th style='text-align: center'>อ</th>";
                            html+="<th style='text-align: center'>พ</th>";
                            html+="<th style='text-align: center'>พฤ</th>";
                            html+="<th style='text-align: center'>ศ</th>";
                            html+="<th style='text-align: center'>ส</th>";
                        

                        html+="</tr>";

                    html+="</thead>";

                    
                   

                  

                    let d1=new Date(year,month-1,1);

                    html+="<tbody>";

                    
                    if(d1.getDay()==0) { html+="<tr>"; }
                    if(d1.getDay()==1) { html+="<tr><td></td>";}
                    if(d1.getDay()==2) { html+="<tr><td></td><td></td>";}
                    if(d1.getDay()==3) { html+="<tr><td></td><td></td><td></td>";}
                    if(d1.getDay()==4) { html+="<tr><td></td><td></td><td></td><td></td>";}
                    if(d1.getDay()==5) { html+="<tr><td></td><td></td><td></td><td></td><td></td>";}
                    if(d1.getDay()==6) { html+="<tr><td></td><td></td><td></td><td></td><td></td><td></td>";}


                    while((d1.getMonth()+1)==month)
                    {
                        
                        if(d1.getDay()==0 && d1.getDate()!=1 ) {
                            html+="<tr>";
                        }

                        let to_day=new Date();
						
						let date_day = new Date(full)

                        let date_str=d1.getDate().toString();
                        if(date_str.length==1){date_str="0"+date_str;}

                        let date_month=(d1.getMonth()+1).toString();
                        if(date_month.length==1){date_month="0"+date_month;}

                        let date_year=d1.getFullYear().toString();
                        if(date_year.length==1){date_year="0"+date_year;}

                        date_str=date_year+"-"+date_month+"-"+date_str;

                        let str_d=d1.getDate().toString();
                        if(str_d.length==1)
                        {
                            str_d="0"+str_d;
                        }

                        let today_class="";
						let dateday_class="";
						
                        if(
                            to_day.getDate()==d1.getDate() &&
                            to_day.getMonth()==d1.getMonth()  &&
                            to_day.getFullYear()==d1.getFullYear() 
                        )
                        {
                            today_class=" class='text-danger'";
                        }
						if(
                            date_day.getDate()==d1.getDate() &&
                            date_day.getMonth()==d1.getMonth()  &&
                            date_day.getFullYear()==d1.getFullYear() 
                        )
                        {
                            dateday_class="style='text-align: center;color: #ffffff;background-color: #286090;border-color: #204d74;'";
                        }else{
							dateday_class="style='text-align: center'";
						}
                        let onclick="";

						html+="<td "+ dateday_class +onclick+" onmouseover=\"this.style.cursor='pointer'\" onmouseout=\"this.style.cursor=''\" "+today_class+" >"+str_d+"</td>";
                        

                        if(d1.getDay()==6) {
                            html+="</tr>";
                        }

                        d1.setDate(d1.getDate()+1);
                    }

                    while(d1.getDay()!=0)
                    {
                        html+="<td></td>";
                        d1.setDate(d1.getDate()+1);
                    }

                    if(html.substr(html.length-5)!="</tr>")
                    {
                        html+="</tr>";
                    }

                    //html+="<td colspan='7' >";

                        //html+="<button class='btn btn-sm btn-danger clear_cal_btn' onclick='$(\"[data-picker="+ran_cal_id+"]\").val(\"\");$(\"[data-picker="+ran_cal_id+"]\").next().remove();'>";
                        //html+="<button class='btn btn-sm btn-danger clear_cal_btn' >";
                            //html+="<i class='fa fa-times' ></i> ร ยธยฅร ยนโ€ฐร ยธยฒร ยธโ€กร ยธโ€ร ยนโ€ฐร ยธยญร ยธยกร ยธยนร ยธยฅร ยธโ€บร ยธลฝร ยธยดร ยธโ€”ร ยธยดร ยธโข";
                        //html+="</button>";

                    //html+="</td>";
                    
                    html+="</tbody>";

                    

                    html+="</table>";
                  
html+="<button class='btn btn-sm btn-danger clear_cal_btn' >";
                        html+="ล้างข้อมูลวันที่";
                    html+="</button>";
	   

                    return html;
                    
                    
   }

   var change_mon_year_cal_pic=function(ran_cal_id)
   {
    
        let html=render_cal_pic(
            element,
            parseInt( $("."+ran_cal_id+"_panel").find(".month_select").val() ),
            parseInt( $("."+ran_cal_id+"_panel").find(".year_select").val() )
        );
        $("."+ran_cal_id+"_panel").find(".clear_cal_btn").remove();
        $("."+ran_cal_id+"_panel").find("table").remove();
        $("."+ran_cal_id+"_panel").append(html);

        $("."+ran_cal_id+"_panel").find("td").on("click",function(){
                        sel_pic_cal(ran_cal_id,this);
        });

        $(element).next().find(".clear_cal_btn").on('click',function(){
            //alert('');
            if(option.onchange!=null)
            {
                option.onchange("");
            }

            $("[data-picker="+ran_cal_id+"]").val("");
            $("[data-picker="+ran_cal_id+"]").next().remove();


        });


   }
    
    //$(element).on("click",()=>{
    $("[data-picker="+ran_cal_id+"]").on("click",function (){
            
         
            if(document.querySelector("."+ran_cal_id+"_panel"))
            {
                $("."+ran_cal_id+"_panel").remove();
                return;
            }
                    let html="";

                  
                    if(this.value!="" && this.value!=null )
                    {
                        let date_arr=this.value.split("/");
                        html=render_cal_pic(element,date_arr[1],parseInt(date_arr[2])-543);
                        
                    }
                    else
                    {
                        html=render_cal_pic(element,(new Date()).getMonth()+1,(new Date()).getFullYear());
                    }

                     

                    let cal=document.createElement("div");
                    $(cal).addClass(ran_cal_id+"_panel");

                    let filter_panel=document.createElement("div");
                    $(filter_panel).css("padding","10px");
                    $(filter_panel).addClass("row");

                    let select_panel1=document.createElement("div");
                    $(select_panel1).addClass("col");

                    let select_panel2=document.createElement("div");
                    $(select_panel2).addClass("col");

                    let month_select=document.createElement("select");
                    $(month_select).addClass("month_select");
                    $(month_select).addClass("form-control");
                    $(select_panel1).append(month_select);

                    $(month_select).append("<option value='01' >มกราคม</option>");
                    $(month_select).append("<option value='02' >กุมภาพันธ์</option>");
                    $(month_select).append("<option value='03' >มีนาคม</option>");
                    $(month_select).append("<option value='04' >เมษายน</option>");
                    $(month_select).append("<option value='05' >พฤษภาคม</option>");
                    $(month_select).append("<option value='06' >มิถุนายน</option>");
                    $(month_select).append("<option value='07' >กรกฎาคม</option>");
                    $(month_select).append("<option value='08' >สิงหาคม</option>");
                    $(month_select).append("<option value='09' >กันยายน</option>");
                    $(month_select).append("<option value='10' >ตุลาคม</option>");
                    $(month_select).append("<option value='11' >พฤศจิกายน</option>");
                    $(month_select).append("<option value='12' >ธันวาคม</option>");

                    let year_select=document.createElement("select");
                    $(year_select).addClass("year_select");
                    $(year_select).addClass("form-control");
                    $(select_panel2).append(year_select);
                    

                    $(select_panel1).append(month_select);
                    $(select_panel2).append(year_select);

                    let year_now=(new Date()).getFullYear();
                    let month_now=(new Date()).getMonth()+1;
                    let year_range;

                    if(option.year_range!=null)
                    {
                        year_range=option.year_range;
                    }
                    else
                    {
                        year_range="-50:+50";
                    }
                    
                    let year1=year_now+parseInt(year_range.split(":")[0]);
                    let year2=year_now+parseInt(year_range.split(":")[1]);

                    while(year1<=year2)
                    {
                        $(year_select).append("<option value='"+year1+"' >"+(year1+543).toString()+"</option>");
                        year1++;
                    }

                    //if( element.value!=null && element.value!="")
                    if(this.value!="" && this.value!=null)
                    {
                        let date_arr=this.value.split("/");

                        $(month_select).val(date_arr[1]);
                        $(year_select).val(parseInt(date_arr[2])-543);
                    }
                    else
                    {
                        month_now=month_now.toString();
                        if(month_now.length==1)
                        {
                            month_now="0"+month_now;
                        }
                        $(month_select).val(month_now);
                        $(year_select).val(year_now);
                    }

                    $(month_select).on("change",function(){change_mon_year_cal_pic(ran_cal_id)});
                    $(year_select).on("change",function(){change_mon_year_cal_pic(ran_cal_id)});

                    let left_btn=document.createElement("button");
                    $(left_btn).prop("type","button");
					$(left_btn).css("width","30px");
                    $(left_btn).addClass("btn");
                    $(left_btn).addClass("btn-sm");
                    $(left_btn).addClass("btn-primary");
                    $(left_btn).html("<i class='fa fa-chevron-left' ></i>");
                    $(left_btn).on("click",function(){
                        
                        let m=parseInt($("."+ran_cal_id+"_panel").find(".month_select").val());
                        m--;
                        if(m==0)
                        {
                            
                            m=12;
                            let y=parseInt($("."+ran_cal_id+"_panel").find(".year_select").val());
                            y--;
                            $("."+ran_cal_id+"_panel").find(".year_select").val(y);
                        }

                        m=m.toString();
                        if(m.length==1)
                        {
                            m="0"+m;
                        }
                        

                        $("."+ran_cal_id+"_panel").find(".month_select").val(m);

                        change_mon_year_cal_pic(ran_cal_id);
                    });

                    let right_btn=document.createElement("button");
                    $(right_btn).prop("type","button");
					$(right_btn).css("width","30px");
                    $(right_btn).addClass("btn");
                    $(right_btn).addClass("btn-sm");
                    $(right_btn).addClass("btn-primary");
                    $(right_btn).html("<i class='fa fa-chevron-right' ></i>");
                    $(right_btn).on("click",function(){

                        let m=parseInt($("."+ran_cal_id+"_panel").find(".month_select").val());
                        m++;
                        if(m==13)
                        {
                           
                            m=1;
                            let y=parseInt($("."+ran_cal_id+"_panel").find(".year_select").val());
                            y++;
                            $("."+ran_cal_id+"_panel").find(".year_select").val(y);
                        }

                        m=m.toString();
                        if(m.length==1)
                        {
                            m="0"+m;
                        }

                      
                        $("."+ran_cal_id+"_panel").find(".month_select").val(m);
                            
                        change_mon_year_cal_pic(ran_cal_id);
                    });

                    $(filter_panel).append(left_btn);
                    $(filter_panel).append(select_panel1);
                    $(filter_panel).append(select_panel2);
                    $(filter_panel).append(right_btn);
                   
                    $(cal).append(filter_panel);
                    $(cal).append(html);
                    
                    $(element).after(cal);
                    $(element).next().find("td").on("click",function(){
                        
                        sel_pic_cal(ran_cal_id,this);
                        
                        

                    });

                    $(element).next().find(".clear_cal_btn").on('click',function(){
                        //alert('');
                        if(option.onchange!=null)
                        {
                            option.onchange("");
                        }

                        $("[data-picker="+ran_cal_id+"]").val("");
                        $("[data-picker="+ran_cal_id+"]").next().remove();


                    });
						
                    /*let clear_btn=document.createElement("button");
                    $(clear_btn).addClass("btn");
                    $(clear_btn).addClass("btn-danger");
                    $(clear_btn).addClass("btn-sm");
                    $(clear_btn).html(" <i class='fa fa-times' ></i> ร ยธยฅร ยนโ€ฐร ยธยฒร ยธโ€กร ยธโ€ร ยนโ€ฐร ยธยญร ยธยกร ยธยนร ยธยฅร ยธโ€บร ยธลฝร ยธยดร ยธโ€”ร ยธยดร ยธโข");
                    $(clear_btn).on("click",()=>{
                       
                    });
                    $(cal).append(clear_btn);*/
                    

    });

}