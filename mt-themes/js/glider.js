
/* 
 ================================================
 PVII Horizontal Glider Magic scripts
 Copyright (c) 2009 Project Seven Development
 www.projectseven.com
 Version: 1.1.8 -build 29
 ================================================
 
 */

var p7HGMover='_over';
var p7HGMopen='_down';
var p7HGMmark='_overdown';
var p7HGMctl=[],p7HGMi=false,p7HGMa=false,p7HGMadv=[];
function P7_HGMset(){
	var h,sh,hd;
	if (!document.getElementById){
		return;
	}
	sh='.p7HGM_viewport_wrapper {width:auto;}\n';
	sh+='.p7HGM_viewport {overflow:hidden;position:relative;width:auto;}\n';
	sh+='.p7HGM_panels_wrapper {width:auto;position:relative;left:0px;overflow:hidden;}\n';
	sh+='.p7HGM_panel {width:auto;float:left;}\n';
	sh+='.p7HGM_controls {width:auto;}\n';
	sh+='.p7HGM_controls div, .p7HGMpaginator, .p7HGMvcr, .p7HGMvcrtext, .p7HGMtrig {display:block !important;}\n';
	sh+='.p7HGMtrig {width:auto;}\n';
	sh+='.p7HGMpaginator {width:auto;}\n';
	if (document.styleSheets){
		h='\n<st' + 'yle type="text/css">\n' + sh + '\n</s' + 'tyle>';
		document.write(h);
	}
	else{
		h=document.createElement('style');
		h.type='text/css';
		h.appendChild(document.createTextNode(sh));
		hd=document.getElementsByTagName('head');
		hd[0].appendChild(h);
	}
}
P7_HGMset();
function P7_opHGM(){
	var x;
	if(!document.getElementById){
		return;
	}
	x=p7HGMctl.length;
	p7HGMctl[x]=arguments;
	if(p7HGMctl[x][1]<=0){
		p7HGMctl[x][1]='auto';
	}
	if(p7HGMctl[x][2]<=0){
		p7HGMctl[x][2]='auto';
	}
}
function P7_HGMaddLoad(){
	if(!document.getElementById){
		return;
	}
	if(window.addEventListener){
		document.addEventListener("DOMContentLoaded",P7_initHGM,false);
		window.addEventListener("load",P7_initHGM,false);
		window.addEventListener("unload",P7_HGMrf,false);
		window.addEventListener("resize",P7_HGMrs,false);
	}
	else if(document.addEventListener){
		document.addEventListener("load",P7_initHGM,false);
		document.addEventListener("resize",P7_HGMrs,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_hgm defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_hgm").onreadystatechange=function(){
			if(this.readyState=="complete"){
				if(p7HGMctl.length>0){
					P7_initHGM();
				}
			}
		};
		window.attachEvent("onload",P7_initHGM);
		window.attachEvent("onresize",P7_HGMrs);
	}
	else if(typeof window.onload=='function'){
		var p7vloadit=onload;
		window.onload=function(){
			p7vloadit();
			P7_initHGM();
		};
		window.onresize=P7_HGMrs;
	}
	else{
		window.onload=P7_initHGM;
		window.onresize=P7_HGMrs;
	}
}
P7_HGMaddLoad();
function P7_HGMrf(){
	return;
}
function P7_initHGM(){
	var i,j,k,x,tB,d,tD,tA,ck,hl,iM,sr,fnA,fnB,swp,s1,s2,s3,wP,zz,pw,vP;
	if(p7HGMi){
		return;
	}
	p7HGMi=true;
	document.p7HGMpreload=[];
	for(i=p7HGMctl.length-1;i>-1;i--){
		tB=document.getElementById(p7HGMctl[i][0]);
		if(tB){
			tB.p7opt=p7HGMctl[i];
			tB.hgmPanels=[];
			tB.hgmTriggers=[];
			tB.hgmPaginators=[];
			tB.hgmCurrentPanel=1;
			tB.hgmPrevPanelID='none';
			tB.hgmDelay=15;
			tB.hgmTargetLeft=0;
			tB.hgmFrameRate=1;
			tB.hgmAnimRunning=false;
			tB.hgmRotate='';
			tB.hgmAutoPlay=false;
			tB.hgmDirection='forward';
			wP=document.getElementById(tB.id.replace('_','wp_'));
			vP=document.getElementById(tB.id.replace('_','vp_'));
			if(tB.p7opt[1]!='auto'){
				vP.style.width=tB.p7opt[1]+'px';
				document.getElementById(tB.id.replace('_','vpw_')).style.width=tB.p7opt[1]+'px';
			}
			if(navigator.appVersion.indexOf("MSIE 6")>-1 || navigator.appVersion.indexOf("MSIE 5")>-1){
				vP.style.width='100%';
			}
			pw=vP.offsetWidth;
			d=tB.id.replace("_","pn_");
			tD=tB.getElementsByTagName('DIV');
			ck=-1;
			hl=0;
			for(j=0;j<tD.length;j++){
				if(tD[j].id&&tD[j].id.indexOf(d)===0){
					x=tB.hgmPanels.length;
					tB.hgmPanels[x]=tD[j].id;
					tD[j].hgmDiv=tB.id;
					tD[j].hgmPanelNum=parseInt(tD[j].id.substr(10),10);
					if(tB.p7opt[1]=='auto'){
						tD[j].style.width=pw+'px';
					}
					else{
						tD[j].style.width=tB.p7opt[1]+'px';
					}
					if(tB.p7opt[2]!='auto'){
						tD[j].style.height=tB.p7opt[2]+'px';
						tD[j].style.overflow='auto';
					}
					tD[j].style.position='absolute';
					tD[j].style.cssFloat="none";
					tD[j].style.top='0px';
					tD[j].style.left=((tD[j].hgmPanelNum-1)*vP.offsetWidth)+'px';
					zz=9000;
					if(ck<0){
						ck=j;
						tB.hgmCurrentPanelID=tD[ck].id;
						tD[j].style.position='relative';
						if(tB.p7opt[3]==4){
							tD[j].style.zIndex='9200';
						}
						tD[j].style.left='0px';
					}
					else{
						if(tB.p7opt[3]==4){
							tD[j].style.zIndex=zz;
							tD[j].style.left=(tD[j].offsetWidth*-1)+'px';
						}
					}
				}
			}
			tB.hgmPanelNums=tB.hgmPanels.length;
			if(tB.p7opt[1]=='auto'){
				wP.style.width =(tB.hgmPanelNums*pw)+'px';
			}
			else{
				wP.style.width=(tB.p7opt[1]*tB.hgmPanelNums)+'px';
			}
			d=tB.id.replace("_","trg_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
				tA=tD.getElementsByTagName('A');
				if(tA){
					d=tB.id.replace('M_','Mt');
					for(k=0;k<tA.length;k++){
						if(tA[k].id&&tA[k].id.indexOf(d)===0){
							tA[k].hgmDiv=tB.id;
							tA[k].hgmPanelNum=tA[k].id.substr(8);
							tB.hgmTriggers[tB.hgmTriggers.length]=tA[k].id;
							tA[k].onclick=function(){
								return P7_HGMcontrol(this,'show');
							};
							if(tB.p7opt[17]==1){
								tA[k].onmouseover=function(){
									P7_HGMcontrol(this,'show');
								};
							}
							iM=tA[k].getElementsByTagName("IMG");
							if(iM&&iM[0]){
								sr=iM[0].getAttribute("src");
								swp=tB.p7opt[13];
								iM[0].hgmSwap=swp;
								x=sr.lastIndexOf(".");
								fnA=sr.substring(0,x);
								fnB='.'+sr.substring(x+1);
								s1=fnA+p7HGMover+fnB;
								s2=fnA+p7HGMopen+fnB;
								s3=fnA+p7HGMmark+fnB;
								if(swp==1){
									iM[0].p7imgswap=[sr,s1,s1,s1];
									P7_HGMpreloader(s1);
								}
								else if(swp==2){
									iM[0].p7imgswap=[sr,s1,s2,s2];
									P7_HGMpreloader(s1,s2);
								}
								else if(swp==3){
									iM[0].p7imgswap=[sr,s1,s2,s3];
									P7_HGMpreloader(s1,s2,s3);
								}
								else{
									iM[0].p7imgswap=[sr,sr,sr,sr];
								}
								iM[0].p7state='closed';
								iM[0].mark=false;
								iM[0].rollover=tB.p7opt[14];
								if(swp>0){
									tA[k].hasImg=true;
									iM[0].onmouseover=function(){
										P7_HGMimovr(this);
									};
									iM[0].onmouseout=function(){
										P7_HGMimout(this);
									};
								}
							}
						}
					}
				}
			}
			d=tB.id.replace("_","pg_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
				tA=tD.getElementsByTagName('A');
				if(tA){
					for(k=0;k<tA.length;k++){
						if(tA[k].id&&tA[k].id.indexOf('p7HGMpg')===0){
							tA[k].hgmDiv=tB.id;
							tA[k].hgmPanelNum=tA[k].id.substr(9);
							tB.hgmPaginators[tB.hgmPaginators.length]=tA[k].id;
							tA[k].onclick=function(){
								return P7_HGMpaginator(this);
							};
							if(tB.p7opt[18]==1){
								tA[k].onmouseover=function(){
									P7_HGMpaginator(this);
								};
							}
						}
					}
				}
			}
			d=tB.id.replace('_','wp_');
			tD=document.getElementById(d);
			if(tD){
				tD.style.left='0px';
				tD.hgmDiv=tB.id;
			}
			if(tB.p7opt[9]==1){
				tD.onmouseover=function(){
					var d=document.getElementById(this.hgmDiv);
					if(d.hgmAutoPlay=='play'){
						this.hgmRestart=true;
						P7_HGMpause(d.id);
					}
					else{
						this.hgmRestart=false;
					}
				};
				tD.onmouseout=function(){
					var d=document.getElementById(this.hgmDiv);
					if(this.hgmRestart){
						this.restart=false;
						P7_HGMplay(d.id,true,true);
					}
				};
			}
			tB.hgmControls=new Array(12);
			d=tB.id.replace("_","mpn_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
			}
			tB.hgmControls[0]=P7_HGMsetCC(tB.id,'bp_','prev');
			tB.hgmControls[1]=P7_HGMsetCC(tB.id,'bn_','next');
			d=tB.id.replace("_","vcr_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
			}
			tB.hgmControls[2]=P7_HGMsetCC(tB.id,'rf_','first');
			tB.hgmControls[3]=P7_HGMsetCC(tB.id,'rp_','prev');
			d=tB.id.replace('_','rpp_');
			tD=document.getElementById(d);
			if(tD){
				tD.p7state='pause';
				tD.hgmDiv=tB.id;
				tB.hgmControls[4]=tD;
				tD.onclick=function(){
					return P7_HGMpausePlay(this);
				};
			}
			tB.hgmControls[5]=P7_HGMsetCC(tB.id,'rn_','next');
			tB.hgmControls[6]=P7_HGMsetCC(tB.id,'rl_','last');
			d=tB.id.replace("_","vcx_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
			}
			tB.hgmControls[7]=P7_HGMsetCC(tB.id,'xf_','first');
			tB.hgmControls[8]=P7_HGMsetCC(tB.id,'xp_','prev');
			d=tB.id.replace('_','xpp_');
			tD=document.getElementById(d);
			if(tD){
				tD.p7state='pause';
				tD.hgmDiv=tB.id;
				tB.hgmControls[9]=tD;
				tD.onclick=function(){
					return P7_HGMpausePlay(this);
				};
			}
			tB.hgmControls[10]=P7_HGMsetCC(tB.id,'xn_','next');
			tB.hgmControls[11]=P7_HGMsetCC(tB.id,'xl_','last');
			d=tB.id.replace('_','pgpp_');
			tD=document.getElementById(d);
			if(tD){
				tD.p7state='pause';
				tD.hgmDiv=tB.id;
				tB.hgmControls[12]=tD;
				tD.onclick=function(){
					return P7_HGMpausePlay(this);
				};
			}
			x=tB.p7opt[5];
			if(x==-1){
				x=Math.floor(Math.random()*tB.hgmPanels.length+1);
			}
			if(x>0){
				P7_HGMcontrol(tB.id,'show',x);
			}
			else{
				P7_HGMcontrol(tB.id,'first');
			}
			if(tB.p7opt[15]==1){
				P7_HGMcurrentMark(tB);
			}
			P7_HGMurl(tB.id);
			if(tB.p7opt[7]==1){
				P7_HGMplay(tB.id,true,true);
			}
		}
	}
	p7HGMa=true;
	P7_HGMrs();
}
function P7_HGMshowPanel(md,d){
	var i,tB,tD,tA,tW,vP,x,w,n,tl,ca,a,op,m=false,iM,pa;
	tB=document.getElementById(md);
	tA=tB.hgmTriggers;
	ca=document.getElementById(d.replace('pn_','t'));
	for(i=0;i<tA.length;i++){
		a=document.getElementById(tA[i]);
		if(a){
			P7_HGMremClass(a,'panel_open');
			if(a==ca){
				P7_HGMsetClass(a,'panel_open');
				if(a.hasImg){
					iM=a.getElementsByTagName("IMG")[0];
					iM.p7state='open';
					iM.src=iM.p7imgswap[2];
				}
			}
			else{
				if(a.hasImg){
					iM=a.getElementsByTagName("IMG")[0];
					iM.p7state='closed';
					if(iM.mark){
						iM.src=iM.p7imgswap[3];
					}
					else{
						iM.src=iM.p7imgswap[0];
					}
				}
			}
		}
	}
	tA=tB.hgmPaginators;
	pa=document.getElementById(d.replace('pn_','pg'));
	for(i=0;i<tA.length;i++){
		a=document.getElementById(tA[i]);
		if(a){
			P7_HGMremClass(a,'panel_open');
			if(a==pa){
				P7_HGMsetClass(a,'panel_open');
			}
		}
	}
	tD=document.getElementById(d);
	if(!tD){
		if(ca&&ca.href!=document.location.href){
			if(ca.href.indexOf('javascr')==-1){
				m=true;
			}
		}
		return m;
	}
	if(d==tB.hgmCurrentPanelID){
		P7_HGMsetControlStates(tB);
		return m;
	}
	tB.hgmPrevPanelID=tB.hgmCurrentPanelID;
	tB.hgmCurrentPanel=tD.hgmPanelNum;
	tB.hgmCurrentPanelID=tD.id;
	tW=document.getElementById(tB.id.replace('_','wp_'));
	vP=document.getElementById(tB.id.replace('_','vp_'));
	tl=(tD.hgmPanelNum-1)*vP.offsetWidth*-1;
	if(vP.scrollLeft !== 0){
		vP.scrollLeft=0;
	}
	if(vP.scrollTop !== 0){
		vP.scrollTop=0;
	}
	op=tB.p7opt[3];
	if(!p7HGMa&&op>0&&op!=4){
		op=0;
		P7_HGMsetGlide(tB,tl,true);
	}
	P7_HGMsetControlStates(tB);
	if(op>0){
		P7_HGMsetGlide(tB,tl);
	}
	else{
		tW.style.left=tl+'px';
		P7_HGMsetPanels(tB);
	}
	if(tB.hgmAutoPlay=='play'){
		if(tB.hgmCurrentPanelID==tB.hgmPanels[tB.hgmPanels.length-1]&&tB.p7opt[6]!=1&tB.p7opt[11]!=1){
			P7_HGMpause(tB.id,true);
		}
		else{
			tB.hgmRotate=setTimeout("P7_HGMplay('"+tB.id+"',true)",tB.p7opt[8]);
		}
	}
	return m;
}
function P7_HGMsetPanels(ob){
	var i,tD;
	for(i=0;i<ob.hgmPanels.length;i++){
		tD=document.getElementById(ob.hgmPanels[i]);
		if(tD.id==ob.hgmCurrentPanelID){
			tD.style.position='relative';
		}
		else{
			tD.style.position='absolute';
		}
	}
}
function P7_HGMcontrol(d,ac,n){
	var a,m=false,tB,pn,cp,sh=false;
	if(typeof(d)=='object'){
		a=d;
		n=d.hgmPanelNum;
		d=d.hgmDiv;
	}
	tB=document.getElementById(d);
	cp=tB.hgmCurrentPanel;
	if(ac=='first' || ac=='prev' || ac=='next' || ac=='last'){
		pn=P7_HGMgetPanel(tB,ac);
		sh=true;
	}
	else if(ac=='show'){
		pn=d.replace('_','pn_')+'_'+n;
		sh=true;
	}
	else if(ac=='pause'){
		P7_HGMpause(d);
	}
	else if(ac=='play'){
		P7_HGMplay(d);
	}
	if(sh){
		if(tB.p7opt[10]==1&&tB.hgmRotate){
			P7_HGMpause(d);
		}
		m=P7_HGMshowPanel(d,pn);
	}
	return m;
}
function P7_HGMpaginator(pG){
	P7_HGMcontrol(pG.hgmDiv,'show',pG.hgmPanelNum);
	return false;
}
function P7_HGMplay(d,sh,de){
	var tB,np;
	tB=document.getElementById(d);
	if(tB){
		if(tB.hgmRotate){
			clearTimeout(tB.hgmRotate);
		}
		np=P7_HGMgetPanel(tB,'next',true);
		if(np==tB.hgmCurrentPanelID){
			if(!sh){
				np=tB.hgmPanels[0];
			}
			else{
				P7_HGMpause(d,sh);
				return;
			}
		}
		P7_HGMsetPlay(tB.hgmControls[4]);
		P7_HGMsetPlay(tB.hgmControls[9]);
		P7_HGMsetPlay(tB.hgmControls[12]);
		tB.hgmAutoPlay='play';
		if(de){
			tB.hgmRotate=setTimeout("P7_HGMshowPanel('"+tB.id+"','"+np+"')",tB.p7opt[8]);
		}
		else{
			P7_HGMshowPanel(tB.id,np);
		}
	}
}
function P7_HGMpause(d){
	var tB;
	tB=document.getElementById(d);
	if(tB){
		if(tB.hgmRotate){
			clearTimeout(tB.hgmRotate);
		}
		P7_HGMsetPause(tB.hgmControls[4]);
		P7_HGMsetPause(tB.hgmControls[9]);
		P7_HGMsetPause(tB.hgmControls[12]);
		tB.hgmAutoPlay='pause';
	}
}
function P7_HGMsetPlay(bt){
	if(bt){
		bt.p7state='play';
		bt.className='pause';
		if(bt.tagName&&bt.tagName=='A'){
			if(bt.firstChild&&bt.firstChild.nodeType==3){
				bt.firstChild.nodeValue='Pause';
			}
		}
	}
}
function P7_HGMsetPause(bt){
	if(bt){
		bt.p7state='pause';
		bt.className='play';
		if(bt.tagName&&bt.tagName=='A'){
			if(bt.firstChild&&bt.firstChild.nodeType==3){
				bt.firstChild.nodeValue='Play';
			}
		}
	}
}
function P7_HGMrotate(d,ac){
	if(ac=='play'){
		P7_HGMplay(d);
	}
	else
	if(ac=='pause'){
		P7_HGMpause(d);
	}
}
function P7_HGMpausePlay(bb,d){
	if(bb.p7state=='pause'){
		P7_HGMplay(bb.hgmDiv);
	}
	else{
		P7_HGMpause(bb.hgmDiv);
	}
	return false;
}
function P7_HGMgetPanel(dd,ac,sh){
	var i,j,cp,tP,k=0,dv='';
	cp=dd.hgmCurrentPanelID;
	tP=dd.hgmPanels;
	j=tP.length-1;
	for(i=0;i<tP.length;i++){
		if(tP[i]==cp){
			k=i;
			break;
		}
	}
	if(ac=='first'){
		dv=tP[0];
	}
	else if(ac=='prev'){
		k--;
		if(k<0){
			if(dd.p7opt[6]==1){
				k=j;
			}
			else{
				k++;
			}
		}
		dv=tP[k];
	}
	else if(ac=='next'){
		k++;
		if(sh&&dd.p7opt[11]==1){
			if(dd.hgmDirection=='reverse'){
				k=i-1;
				if(k<0){
					dd.hgmDirection='forward';
					k=i+1;
				}
			}
			else if(dd.hgmDirection=='forward'){
				if(k>j){
					dd.hgmDirection='reverse';
					k=i-1;
				}
			}
		}
		if(k>j){
			if(dd.p7opt[6]==1){
				k=0;
			}
			else{
				k--;
			}
		}
		dv=tP[k];
	}
	else if(ac=='last'){
		dv=tP[j];
	}
	return dv;
}
function P7_HGMsetControlStates(dd){
	var cp,tP,j,cl;
	if(dd.p7opt[6]===0){
		cp=dd.hgmCurrentPanelID;
		tP=dd.hgmPanels;
		j=tP.length-1;
		cl='off';
		if(tP[0]==cp){
			P7_HGMsetClass(dd.hgmControls[0],cl);
			P7_HGMsetClass(dd.hgmControls[2],cl);
			P7_HGMsetClass(dd.hgmControls[3],cl);
			P7_HGMsetClass(dd.hgmControls[7],cl);
			P7_HGMsetClass(dd.hgmControls[8],cl);
		}
		else{
			P7_HGMremClass(dd.hgmControls[0],cl);
			P7_HGMremClass(dd.hgmControls[2],cl);
			P7_HGMremClass(dd.hgmControls[3],cl);
			P7_HGMremClass(dd.hgmControls[7],cl);
			P7_HGMremClass(dd.hgmControls[8],cl);
		}
		if(tP[j]==cp){
			P7_HGMsetClass(dd.hgmControls[1],cl);
			P7_HGMsetClass(dd.hgmControls[5],cl);
			P7_HGMsetClass(dd.hgmControls[6],cl);
			P7_HGMsetClass(dd.hgmControls[10],cl);
			P7_HGMsetClass(dd.hgmControls[11],cl);
		}
		else{
			P7_HGMremClass(dd.hgmControls[1],cl);
			P7_HGMremClass(dd.hgmControls[5],cl);
			P7_HGMremClass(dd.hgmControls[6],cl);
			P7_HGMremClass(dd.hgmControls[10],cl);
			P7_HGMremClass(dd.hgmControls[11],cl);
		}
	}
}
function P7_HGMsetGlide(dd,tl,bp){
	var tW,dur,dy,stp,fr,frh,ds,cl,tP,th,ch,dh,vP;
	tW=document.getElementById(dd.id.replace('_','wp_'));
	vP=document.getElementById(dd.id.replace('_','vp_'));
	dur=dd.p7opt[4];
	dur=(dur>0)?dur:250;
	dy=(dd.p7opt[3]==2)?15:20;
	dd.hgmDelay=dy;
	dd.hgmTargetLeft=tl;
	stp=dur/dy;
	cl=parseInt(tW.style.left,10);
	ds=Math.abs(Math.abs(tl)-Math.abs(cl));
	if(dd.p7opt[3]==3){
		ds=vP.offsetWidth;
	}
	fr=parseInt(ds/stp,10);
	fr=(fr<=1)?1:fr;
	dd.hgmFrameRate=fr;
	if(dd.p7opt[2]!='auto'){
		th=tW.offsetHeight;
	}
	else{
		tP=document.getElementById(dd.hgmCurrentPanelID);
		th=tP.offsetHeight;
	}
	ch=tW.offsetHeight;
	dh=Math.abs(Math.abs(th)-Math.abs(ch));
	frh=parseInt(dh/stp,10);
	frh=(frh<=1)?1:frh;
	dd.hgmFrameRateHeight=frh;
	dd.hgmTargetHeight=th;
	if(!bp){
		if(dd.p7opt[3]==4){
			if(dh>0&&!dd.hgmAnimRunning){
				dd.hgmAnimRunning=true;
				dd.hgmGlider=setInterval("P7_HGMglider('"+dd.id+"')",dd.hgmDelay);
			}
			else{
				P7_HGMsetPanels(dd);
				P7_HGMsetFader(dd);
			}
		}
		else if((ds>0||dh>0)&&!dd.hgmAnimRunning){
			dd.hgmAnimRunning=true;
			P7_HGMsetOverflow(dd);
			dd.hgmGlider=setInterval("P7_HGMglider('"+dd.id+"')",dd.hgmDelay);
		}
	}
}
function P7_HGMsetFader(dd){
	var i,zz,cP,pP,tPS,p,tW;
	tW=document.getElementById(dd.id.replace('_','wp_'));
	dd.hgmFrameRateFader=4;
	dd.hgmDelayFader=30;
	cP=document.getElementById(dd.hgmCurrentPanelID);
	if(p7HGMa){
		if(!cP.filters){
			cP.style.opacity=0.01;
		}
		else{
			cP.style.filter='alpha(opacity=1)';
		}
	}
	cP.hgmOpacity=1;
	cP.style.zIndex=9200;
	cP.style.left='0px';
	pP=document.getElementById(dd.hgmPrevPanelID);
	tPS=dd.hgmPanels;
	for(i=0;i<tPS.length;i++){
		p=document.getElementById(tPS[i]);
		if(p.id!=cP.id){
			zz=9000;
			if(p==pP){
				zz=9100;
				if(p7HGMa){
					if(!p.filters){
						p.style.opacity=0.99;
					}
					else{
						p.style.filter='alpha(opacity=99)';
					}
				}
				else{
					p.style.left=(p.offsetWidth*-1)+'px';
				}
				p.hgmOpacity=100;
				p.style.zIndex=zz;
			}
			else{
				p.style.zIndex=zz;
				p.hgmOpacity=100;
				p.style.left=(p.offsetWidth*-1)+'px';
			}
		}
	}
	tW.style.left='0px';
	if(!dd.hgmFaderRunning){
		dd.hgmFaderRunning=true;
		dd.hgmFader=setInterval("P7_HGMfader('"+dd.id+"')",dd.hgmDelayFader);
	}
}
function P7_HGMfader(dv){
	var tB,cP,pP,co,po,ulm=99,llm=1,fr;
	tB=document.getElementById(dv);
	fr=tB.hgmFrameRateFader;
	cP=document.getElementById(tB.hgmCurrentPanelID);
	pP=document.getElementById(tB.hgmPrevPanelID);
	co=cP.hgmOpacity;
	po=pP.hgmOpacity;
	co+=fr;
	po -= fr;
	if(cP.id==pP.id){
		po=llm;
	}
	co=(co >= ulm)?ulm:co;
	po=(po<=llm)?llm:po;
	cP.hgmOpacity=co;
	pP.hgmOpacity=po;
	if(!cP.filters){
		cP.style.opacity=(co / 100);
		if(cP.id!=pP.id){
			pP.style.opacity=(po / 100);
		}
	}
	else{
		cP.style.filter='alpha(opacity='+(co)+')';
		if(cP.id!=pP.id){
			pP.style.filter='alpha(opacity='+(po)+')';
		}
	}
	if(co==ulm&&po==llm){
		tB.hgmFaderRunning=false;
		clearInterval(tB.hgmFader);
		pP.style.left=(pP.offsetWidth*-1)+'px';
		if(cP.filters){
			cP.style.filter='';
			pP.style.filter='';
		}
		else{
			pP.style.opacity=1;
			cP.style.opacity=1;
		}
	}
}
function P7_HGMglider(d){
	var tB,tW,tl,th,cl,ch,fr,frh,dy,nl=0,nh=0,op,tt,tp,pc=0.15,m=false;
	tB=document.getElementById(d);
	tW=document.getElementById(tB.id.replace('_','wp_'));
	tl=tB.hgmTargetLeft;
	cl=parseInt(tW.style.left,10);
	fr=tB.hgmFrameRate;
	dy=tB.hgmDelay;
	op=tB.p7opt[3];
	if(op==2){
		tt=Math.abs(Math.abs(tl)-Math.abs(cl));
		tp=parseInt(tt*pc,10);
		fr=(tp<1)?1:tp;
	}
	if(tB.p7opt[3]==4){
		cl=tl;
	}
	th=tB.hgmTargetHeight;
	ch=parseInt(tW.style.height,10);
	if(!ch){
		ch=tW.offsetHeight;
	}
	frh=tB.hgmFrameRateHeight;
	if(op==2){
		tt=Math.abs(Math.abs(th)-Math.abs(ch));
		tp=parseInt(tt*pc,10);
		frh=(tp<1)?1:tp;
	}
	if(tl<cl){
		nl=cl-fr;
		nl=(nl<=tl)?tl:nl;
		tW.style.left=nl+'px';
		m=true;
	}
	else if(tl>cl){
		nl=cl+fr;
		nl=(nl>=tl)?tl:nl;
		tW.style.left=nl+'px';
		m=true;
	}
	if(th<ch){
		nh=ch-frh;
		nh=(nh<=th)?th:nh;
		tW.style.height=nh+'px';
		m=true;
	}
	else if(th>ch){
		nh=ch+frh;
		nh=(nh>=th)?th:nh;
		tW.style.height=nh+'px';
		m=true;
	}
	if(!m){
		clearInterval(tB.hgmGlider);
		tB.hgmAnimRunning=false;
		P7_HGMrestoreOverflow(tB);
		P7_HGMsetPanels(tB);
		if(tB.p7opt[2]=='auto'){
			tW.style.height='auto';
		}
		if(tB.p7opt[3]==4){
			P7_HGMsetFader(tB);
		}
	}
}
function P7_HGMpreloader(){
	var i,x;
	for(i=0;i<arguments.length;i++){
		x=document.p7HGMpreload.length;
		document.p7HGMpreload[x]=new Image();
		document.p7HGMpreload[x].src=arguments[i];
	}
}
function P7_HGMimovr(im){
	var m=false,r=im.rollover;
	if(im.mark){
		m=(r>1)?true:false;
	}
	else
	if(im.p7state=='open'){
		m=(r==1 || r==3)?true:false;
	}
	else{
		m=true;
	}
	if(m){
		im.src=im.p7imgswap[1];
	}
}
function P7_HGMimout(im){
	var r=im.rollover;
	if(im.mark){
		if(im.p7state=='open'){
			im.src=im.p7imgswap[2];
		}
		else{
			im.src=im.p7imgswap[3];
		}
	}
	else
	if(im.p7state=='open'){
		if(r==1 || r==3){
			im.src=im.p7imgswap[2];
		}
	}
	else{
		im.src=im.p7imgswap[0];
	}
}
function P7_HGMmark(){
	p7HGMadv[p7HGMadv.length]=arguments;
}
function P7_HGMcurrentMark(el){
	var j,i,x,wH,cm=false,mt=['',1,'',''],op,r1,k,kk,tA,aU,pp,tr,aT,aP,d,pn;
	wH=window.location.href;
	if(el.p7opt[16]!=1){
		wH=wH.replace(window.location.search,'');
	}
	if(wH.charAt(wH.length-1)=='#'){
		wH=wH.substring(0,wH.length-1);
	}
	for(k=0;k<p7HGMadv.length;k++){
		if(p7HGMadv[k][0]&&p7HGMadv[k][0]==el.id){
			mt=p7HGMadv[k];
			cm=true;
			break;
		}
	}
	op=mt[1];
	if(op<1){
		return;
	}
	r1=/index\.[\S]*/i;
	k=-1;
	kk=-1;
	tA=[];
	d=document.getElementById(el.id.replace("_","trg_"));
	if(d){
		aT=d.getElementsByTagName('A');
		if(aT&&aT.length>0){
			for(i=0;i<aT.length;i++){
				tA[tA.length]=aT[i];
			}
		}
	}
	d=document.getElementById(el.id.replace("_","wp_"));
	if(d){
		aP=d.getElementsByTagName('A');
		if(aP&&aP.length>0){
			for(i=0;i<aP.length;i++){
				tA[tA.length]=aP[i];
			}
		}
	}
	for(j=0;j<tA.length;j++){
		aU=tA[j].href.replace(r1,'');
		if(op>0){
			if(tA[j].href==wH || aU==wH){
				k=j;
				kk=-1;
			}
		}
		if(op==2){
			if(tA[j].firstChild){
				if(tA[j].firstChild.nodeValue==mt[2]){
					kk=j;
				}
			}
		}
		if(op==3&&tA[j].href.indexOf(mt[2])>-1){
			kk=j;
		}
		if(op==4){
			for(x=2;x<mt.length;x+=2){
				if(wH.indexOf(mt[x])>-1){
					if(tA[j].firstChild&&tA[j].firstChild.nodeValue){
						if(tA[j].firstChild.nodeValue==mt[x+1]){
							kk=j;
						}
					}
				}
			}
		}
	}
	k=(kk>k)?kk:k;
	if(k>-1){
		if(tA[k].hgmPanelNum){
			tr=tA[k];
			pn=tA[k].id.replace("t","pn_");
		}
		else{
			P7_HGMsetClass(tA[k],'current_mark');
			pp=tA[k].parentNode;
			while (pp){
				if(pp.id&&pp.id.indexOf('p7HGMpn_')===0){
					tr=document.getElementById(pp.id.replace("pn_","t"));
					pn=pp.id;
					break;
				}
				pp=pp.parentNode;
			}
		}
		if(tr){
			P7_HGMsetClass(tr,'current_mark');
			P7_HGMsetClass(tr.parentNode,'current_mark');
			P7_HGMshowPanel(el.id,pn);
		}
	}
}
function P7_HGMurl(dv){
	var i,h,s,x,d='hgm',pn,n=dv.replace("p7HGM_","");
	if(document.getElementById){
		h=document.location.search;
		if(h){
			h=h.replace('?','');
			s=h.split(/[=&]/g);
			if(s&&s.length){
				for(i=0;i<s.length;i+=2){
					if(s[i]==d){
						x=s[i+1];
						if(n!=x.charAt(0)){
							x=false;
						}
						if(x){
							pn='p7HGMpn_'+x;
							P7_HGMshowPanel(dv,pn);
						}
					}
				}
			}
		}
		h=document.location.hash;
		if(h){
			x=h.substring(1,h.length);
			if(n!=x.charAt(3)){
				x=false;
			}
			if(x&&x.indexOf(d)===0){
				pn='p7HGMpn_'+x.substring(3);
				P7_HGMshowPanel(dv,pn);
			}
		}
	}
}
function P7_HGMov(ob){
	var s,m;
	s=ob.style.overflow;
	if(!s){
		if(ob.currentStyle){
			s=ob.currentStyle.overflow;
		}
		else
		if(document.defaultView.getComputedStyle(ob,"")){
			s=document.defaultView.getComputedStyle(ob,"").getPropertyValue("overflow");
		}
	}
	m=(s&&s=='auto')?true:false;
	return m;
}
function P7_HGMsetCC(dd,rp,ac){
	var d,tD;
	d=dd.replace('_',rp);
	tD=document.getElementById(d);
	if(tD){
		tD.onclick=function(){
			return P7_HGMcontrol(dd,ac);
		};
	}
	return tD;
}
function P7_HGMsetClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		nc=cl;
		if(cc&&cc.length>0){
			if(cc.indexOf(cl)==-1){
				nc=cc+' '+cl;
			}
			else{
				nc=cc;
			}
		}
		nc=nc.replace(r,' ');
		ob.className=nc;
	}
}
function P7_HGMremClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		if(cc&&cc.indexOf(cl>-1)){
			nc=cc.replace(cl,'');
			nc=nc.replace(r,' ');
			nc=nc.replace(/\s$/,'');
			ob.className=nc;
		}
	}
}
function P7_HGMhasOverflow(ob){
	var s,m;
	s=ob.style.overflow;
	if(!s){
		if(document.defaultView.getComputedStyle(ob,"")){
			s=document.defaultView.getComputedStyle(ob,"").getPropertyValue("overflow");
		}
	}
	m=(s&&s.indexOf('auto')>-1)?true:false;
	return m;
}
function P7_HGMsetOverflow(tB){
	if(navigator.userAgent.toLowerCase().indexOf('gecko')>-1){
		var i,dv,tD=tB.hgmPanels;
		for(i=0;i<tD.length;i++){
			dv=document.getElementById(tD[i]);
			if(P7_HGMhasOverflow(dv)){
				dv.hgmOverflow='auto';
				dv.style.overflow='hidden';
			}
			else{
				dv.hgmOverflow='';
			}
		}
	}
}
function P7_HGMrestoreOverflow(tB){
	if(navigator.userAgent.toLowerCase().indexOf('gecko')>-1){
		var i,dv,tD=tB.hgmPanels;
		for(i=0;i<tD.length;i++){
			dv=document.getElementById(tD[i]);
			if(dv.hgmOverflow=='auto'){
				if(!tB.hgmAnimRunning){
					dv.style.overflow='auto';
				}
			}
		}
	}
}
function P7_HGMrs(){
	var i,j,tB,vP,wP,tD,pP,tl,h=0,oh,w=0,jj,n;
	if(!p7HGMa){
		return;
	}
	for(i=p7HGMctl.length-1;i>-1;i--){
		if(p7HGMctl[i][1]=='auto'){
			tB=document.getElementById(p7HGMctl[i][0]);
			if(tB.hgmAnimRunning){
				continue;
			}
			wP=document.getElementById(tB.id.replace('_','wp_'));
			vP=document.getElementById(tB.id.replace('_','vp_'));
			w=vP.offsetWidth;
			for(j=0;j<tB.hgmPanels.length;j++){
				pP=document.getElementById(tB.hgmPanels[j]);
				pP.style.width=w+'px';
				if(tB.p7opt[3]==4){
					if(pP.id!=tB.hgmCurrentPanelID){
						pP.style.left=(pP.offsetWidth*-1)+'px';
					}
				}
				else{
					pP.style.left=((pP.hgmPanelNum-1)*w)+'px';
				}
			}
			n=tB.hgmPanelNums;
			if(n&&n>0){
				if(tB.p7opt[1]=='auto'){
					wP.style.width =(n*w)+'px';
				}
				else{
					wP.style.width=(tB.p7opt[1]*n)+'px';
				}
			}
			tl=(tB.hgmCurrentPanel-1)*vP.offsetWidth*-1;
			tB.targetLeft=tl;
			if(tB.p7opt[3]!=4){
				wP.style.left=tl+'px';
			}
		}
	}
}
