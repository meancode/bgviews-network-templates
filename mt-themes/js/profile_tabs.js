
/* 

  ================================================
  PVII Elevator Panel Magic scripts
  Copyright (c) 2008-2009 Project Seven Development
  www.projectseven.com
  Version:  2.1.2 - script build: 1-27
  ================================================
  
*/

var p7EPMa=false,p7EPMi=false,p7EPMctl=[],p7EPMmo,p7EPMmanim=false,p7EPMadv=[];;
function P7_EPMset(){
	var i,h,sh,hd,x,v;
	if(!document.getElementById){
		return;
	}
	sh='.p7epm_cwrapper {height:0px;overflow:hidden;}\n';
	if(document.styleSheets){
		h='\n<st' + 'yle type="text/css">\n'+sh+'\n</s' + 'tyle>';
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
P7_EPMset();
function P7_EPMaddLoad(){
	if(window.addEventListener){
		if(!/KHTML|WebKit/i.test(navigator.userAgent)){
			document.addEventListener("DOMContentLoaded",P7_initEPM,false);
		}
		window.addEventListener("load",P7_initEPM,false);
		window.addEventListener("unload",P7_EPMff,false);
	}
	else if(document.addEventListener){
		document.addEventListener("load",P7_initEPM,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_epm defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_epm").onreadystatechange=function(){
			if (this.readyState=="complete"){
				if(p7EPMctl.length>0){
					P7_initEPM();
				}
			}
		};
		window.attachEvent("onload",P7_initEPM);
	}
	else if(typeof window.onload=='function'){
		var p7vloadit=onload;
		window.onload=function(){
			p7vloadit();
			P7_initEPM();
		};
	}
	else{
		window.onload=P7_initEPM;
	}
}
P7_EPMaddLoad();
function P7_EPMff(){
	return;
}
function P7_opEPM(){
	var h='',hh,b,cn,sD,d,tB,cTD,mD;
	if(!document.getElementById){
		return;
	}
	p7EPMctl[p7EPMctl.length]=arguments;
}
function P7_initEPM(){
	var i,j,x,tB,tD,tA,tg,cP,dh,tr,ob,cl;
	if(!document.getElementById){
		return;
	}
	if(p7EPMi){
		return;
	}
	p7EPMi=true;
	for(i=0;i<p7EPMctl.length;i++){
		tB=document.getElementById(p7EPMctl[i][0]);
		if(tB){
			tB.p7opt=p7EPMctl[i];
			if(tB.p7opt[8]==1){
				tB.onmouseout=P7_EPMout;
			}
			cl=parseInt(tB.className.replace('p7EPM',''));
			if(navigator.appVersion.indexOf("MSIE 5")>-1){
				tB.p7opt[2]=0;
			}
			tB.p7EPMtrig=new Array();
			tB.p7EPMcont=new Array();
			tD=document.getElementById(tB.id.replace("EPM_","EPMt_"));
			if(tD){
				tA=tD.getElementsByTagName("A");
				if(tB.p7opt[8]==1){
					tD.onmouseout=P7_EPMout;
				}
				tg='p7EPMtrg';
				x=0;
				for(j=0;j<tA.length;j++){
					if(tA[j].id && tA[j].id.indexOf(tg)===0){
						tA[j].onclick=function(){
							return P7_EPMtrig(this);
						};
						if(tB.p7opt[4]==1){
							tA[j].onmouseover=function(){
								if(p7EPMmo){
									clearTimeout(p7EPMmo);
								}
								p7EPMmanim=true;
								p7EPMmo=setTimeout("P7_EPMmtrg('"+this.id+"',1)",200);
							};
							tA[j].onmouseout=function(){
								if(p7EPMmo){
									clearTimeout(p7EPMmo);
								}
								p7EPMmanim=false;
							};
						}
						tB.p7EPMtrig[x]=tA[j];
						x++;
						tA[j].p7state='closed';
						tA[j].p7EPMpr=tB.id;
						cP=document.getElementById(tA[j].id.replace("trg","w"));
						tB.p7EPMcont[tB.p7EPMcont.length]=(cP)?cP:null;
						if(cP){
							tA[j].p7EPMw=cP.id;
							cP.p7state='closed';
							cP.p7EPMtrg=tA[j].id;
							if(cl&&cl>49){
								cP.style.position='absolute';
							}
							if(tB.p7opt[2]==1||tB.p7opt[2]==2){
								cP.style.height='0px';
								cP.p7EPMtarget=0;
								cP.p7EPMrate=10;
								cP.p7ch=0;
							}
							else{
								cP.style.display='none';
								cP.style.height='auto';
							}
						}
						else{
							tA[j].p7EPMw=false;
							P7_EPMsetClass(tA[j],'p7EPM_ext');
						}
					}
				}
				tr=tB.id.replace("_","trg")+"_"+tB.p7opt[1];
				ob=document.getElementById(tr);
				if(ob){
					P7_EPMopen(ob);
				}
				if(tB.p7opt[10]==1){
					P7_EPMcurrentMark(tB);
				}
				if(tB.p7opt[5]>0){
					P7_EPMrotate(tB.id,tB.p7opt[5]);
				}
			}
		}
	}
	for(i=0;i<p7EPMctl.length;i++){
		P7_EPMurl(p7EPMctl[i][0]);
	}
	p7EPMa=true;
}
function P7_EPMmtrg(d){
	P7_EPMtrig(document.getElementById(d),1);
}
function P7_EPMout(evt){
	var tg,m=true,pp,idd,tR,cR;
	idd=this.id.replace("t",'');
	evt=(evt)?evt:event;
	tg=(evt.relatedTarget)?evt.relatedTarget:evt.toElement;
	tR=idd.replace('_','t_');
	cR=idd.replace('_','c');
	if(tg){
		pp=tg;
		while(pp){
			if(pp&&pp.id){
				if(pp.id.indexOf(tR)===0||pp.id.indexOf(cR)===0){
					m=false;
					break;
				}
			}
			pp=pp.parentNode;
		}
	}
	if(m){
		P7_EPMall(idd,'close');
	}
}
function P7_EPMctl(tr,ac,bp){
	var tA=document.getElementById(tr);
	if(tA){
		if(ac=='open'){
			if(tA.p7state!='open'){
				P7_EPMtrig(tA,0,bp);
			}
		}
		else if(ac=='close'){
			if(tA.p7state!='closed'){
				P7_EPMtrig(tA,0,bp);
			}
		}
		else if(ac=='trigger'){
			P7_EPMtrig(tA,0,bp);
		}
	}
	return false;
}
function P7_EPMall(dv,ac){
	var i,j,mD,a;
	if(dv=='all'){
		for(i=0;i<p7EPMctl.length;i++){
			if(ac=='open'){
				mD=document.getElementById(p7EPMctl[i][0]);
				for(j=0;j<mD.p7EPMtrig.length;j++){
					if(mD.p7EPMtrig[j].p7state!='open'){
						P7_EPMopen(mD.p7EPMtrig[j]);
					}
				}
			}
			else{
				P7_EPMtoggle(p7EPMctl[i][0]);
			}
		}
	}
	else{
		mD=document.getElementById(dv);
		if(mD){
			if(ac=='open'){
				for(j=0;j<mD.p7EPMtrig.length;j++){
					if(mD.p7EPMtrig[j].p7state!='open'){
						P7_EPMopen(mD.p7EPMtrig[j]);
					}
				}
			}
			else{
				P7_EPMtoggle(dv);
			}
		}
	}
}
function P7_EPMtrig(a,mv,bp){
	var i,j,mD,tB,m=true;
	if(!bp&&mv!=1&&a.href!=document.location.href){
		if(a.hash.indexOf('#p7EPMc')==-1){
			if(a.href.replace(/index\.[\S]*/i,'')!=document.location.href){
				if(a.href.indexOf('/')>-1||a.href.indexOf('.')>-1){
					return true;
				}
			}
		}
	}
	if(!p7EPMa&&!bp){
		return false;
	}
	if(mv==1&&a.p7state=='open'){
		return false;
	}
	if(a.p7EPMw){
		m=false;
	}
	mD=document.getElementById(a.p7EPMpr);
	if(!mv&&p7EPMmanim){
		return m;
	}
	if(mD.p7rtmr){
		clearTimeout(mD.p7rtmr);
	}
	if(mD.p7opt[3]==1){
		P7_EPMtoggle(a.p7EPMpr,a);
	}
	else if(mD.p7opt[3]==2){
		for(j=0;j<p7EPMctl.length;j++){
			P7_EPMtoggle(p7EPMctl[j][0],a);
		}
	}
	if(a.p7state=='open'){
		if(mD.p7opt[7]==1 && mD.p7opt[3]>0){
			return m;
		}
		else{
			P7_EPMclose(a);
		}
	}
	else{
		P7_EPMopen(a);
	}
	return m;
}
function P7_EPMtoggle(dv,a){
	var i,mD;
	mD=document.getElementById(dv);
	if(mD){
		for(i=0;i<mD.p7EPMtrig.length;i++){
			if(mD.p7EPMtrig[i].p7state!='closed'){
				if(mD.p7EPMtrig[i]!=a){
					P7_EPMclose(mD.p7EPMtrig[i]);
				}
			}
		}
	}
}
function P7_EPMopen(a){
	var i,mD,wD,cD,ch,th,ov=false,cl,op;
	a.p7state='open';
	P7_EPMsetClass(a,'p7epm_open');
	mD=document.getElementById(a.p7EPMpr);
	wD=document.getElementById(a.p7EPMw);
	op=mD.p7opt[2];
	if(!p7EPMa){
		op=0;
	}
	if(wD){
		cD=document.getElementById(wD.id.replace('w','c'));
		if(op>0){
			if(navigator.userAgent.toLowerCase().indexOf("gecko")>-1){
				if(P7_EPMov(cD)){
					cD.style.overflow="hidden";
					cD.p7ov=true;
				}
			}
			wD.style.height='0px';
			wD.p7ch=0;
			P7_EPMsetGlide(a,op,mD.p7opt[9]);
			if(!mD.p7EPMrunning){
				mD.p7EPMrunning=true;
				mD.p7EPMglide=setInterval("P7_EPMglide('"+mD.id+"')",wD.p7EPMdy);
			}
		}
		else{
			p7EPMmanim=false;
			if(mD.p7opt[2]==0){
				wD.style.display='block';
			}
			else{
				wD.style.height='auto';
				P7_EPMsetGlide(a,op,mD.p7opt[9]);
				wD.p7ch=wD.p7EPMtarget;
			}
		}
	}
}
function P7_EPMclose(a){
	var i,mD,wD,cD,ch,th,ov=false,op;
	a.p7state='closed';
	P7_EPMremClass(a,'p7epm_open');
	mD=document.getElementById(a.p7EPMpr);
	op=mD.p7opt[2];
	if(!p7EPMa){
		op=0;
	}
	wD=document.getElementById(a.p7EPMw);
	if(wD){
		cD=document.getElementById(wD.id.replace('w','c'));
		if(op>0){
			if(navigator.userAgent.toLowerCase().indexOf("gecko")>-1){
				if(P7_EPMov(cD)){
					cD.style.overflow="hidden";
					cD.p7ov=true;
				}
			}
			wD.p7ch=wD.offsetHeight;
			P7_EPMsetGlide(a,op,mD.p7opt[9]);
			if(!mD.p7EPMrunning){
				mD.p7EPMrunning=true;
				mD.p7EPMglide=setInterval("P7_EPMglide('"+mD.id+"')",wD.p7EPMdy);
			}
		}
		else{
			p7EPMmanim= false;
			if(mD.p7opt[2]==0){
				wD.style.display='none';
			}
			else{
				wD.style.height='0px';
				wD.p7ch=0;
				P7_EPMsetGlide(a,op,mD.p7opt[9]);
			}
		}
	}
}
function P7_EPMrotate(dv,md,pn){
	var i;
	tB=document.getElementById(dv);
	if(md===0){
		if(tB.p7rtmr){
			clearTimeout(tB.p7rtmr);
		}
		if(tB.p7rtrun){
			tB.p7rtcntr--;
			tB.p7rtrun=false;
		}
		return;
	}
	else{
		if(tB.p7rtrun){
			return;
		}
	}
	if(tB&&tB.p7EPMtrig){
		if(md>0){
			tB.p7rtmd=md;
			tB.p7rtcy=1;
			tB.p7rtcntr=1;
		}
		if(!pn){
			pn=-1;
			for(i=0;i<tB.p7EPMtrig.length;i++){
				if(tB.p7EPMtrig[i].p7state=='open'){
					pn=i;
					break;
				}
			}
		}
		else{
			pn--;
		}
		pn=(pn<-1)?0:pn;
		pn=(pn>tB.p7EPMtrig.length-1)?tB.p7EPMtrig.length-1:pn;
		if(md>0){
			tB.p7rtsp=pn;
		}
		if(tB.p7rtmr){
			clearTimeout(tB.p7rtmr);
		}
		tB.p7rtmr=setTimeout("P7_EPMrunrt('"+dv+"',"+pn+")",10);
	}
}
function P7_EPMrunrt(dv,n){
	var a,tB;
	tB=document.getElementById(dv);
	tB.p7rtrun=true;
	if(tB.p7rtmr){
		clearTimeout(tB.p7rtmr);
	}
	if(n>-1&&n<tB.p7EPMtrig.length){
		a=tB.p7EPMtrig[n];
		if(a.p7state!="open"){
			P7_EPMtrig(a,0,true);
		}
		tB.p7rtcntr++;
	}
	n++;
	if(tB.p7rtcntr>tB.p7EPMtrig.length){
		tB.p7rtcy++;
		tB.p7rtcntr=1;
	}
	if(n>=tB.p7EPMtrig.length){
		n=0;
	}
	if(tB.p7rtcy>tB.p7rtmd){
		if(tB.p7rtsp==-1){
			tB.p7rtmr=setTimeout("P7_EPMall('"+dv+"','all')",tB.p7opt[6]);
		}
		else{
			tB.p7rtmr=setTimeout("P7_EPMctl('"+	tB.p7EPMtrig[n].id+"','open',true)",tB.p7opt[6]);
		}
		tB.p7rtrun=false;
	}
	else{
		tB.p7rtmr=setTimeout("P7_EPMrunrt('"+dv+"',"+n+")",tB.p7opt[6]);
	}
}
function P7_EPMglide(d){
	var i,ht,tB,tA,tC,st,ch,th,nh,inc,tt,tp,pc=.15,m=false,cD;
	tB=document.getElementById(d);
	tA=tB.p7EPMtrig;
	tC=tB.p7EPMcont;
	for(i=0;i<tA.length;i++){
		st=tA[i].p7state;
		if(tC[i]){
			ch=tC[i].p7ch;
			if(st=='open'&&tC[i].p7EPMtarget==0){
				tC[i].p7EPMtarget=tC[i].offsetHeight;
			}
			th=(st=='closed')?0:tC[i].p7EPMtarget;
			inc=tC[i].p7EPMrate;
			if(tB.p7opt[2]==2){
				tt=Math.abs( parseInt(ch-th) );
				tp=parseInt(tt*pc);
				inc=(tp<1)?1:tp;
			}
			if(st=='closed'&&ch!==0){
				nh=ch-inc;
				nh=(nh<=0)?0:nh;
				m=true;
				tC[i].style.height=nh+'px';
				tC[i].p7ch=nh;
			}
			else if(st=='open'&&ch!=th){
				nh=ch+inc;
				nh=(nh>=th)?th:nh;
				m=true;
				tC[i].style.height=nh+'px';
				tC[i].p7ch=nh;
			}
			else{
				if(st=='open'){
					tC[i].style.height='auto';
					cD=document.getElementById(tC[i].id.replace("w","c"));
					if(cD.p7ov){
						cD.style.overflow="auto";
						cD.p7ov=false;
					}
				}
			}
		}
	}
	if(!m){
		p7EPMmanim=false;
		tB.p7EPMrunning=false;
		clearInterval(tB.p7EPMglide);
	}
}
function P7_EPMsetGlide(a,op,dur){
	var tC,tS,th,stp,fr,dy;
	dur=(dur>0)?dur:250;
	dy=(op==2)?15:20;
	tC=document.getElementById(a.p7EPMw);
	tC.p7EPMdy=dy;
	tS=document.getElementById(a.id.replace('trg','c'));
	th=tS.offsetHeight;
	tC.p7EPMtarget=th;
	stp=dur/dy;
	fr=parseInt(th/stp);
	fr=(fr<=1)?1:fr;
	tC.p7EPMrate=fr;
}
function P7_EPMmark(){
	p7EPMadv[p7EPMadv.length]=arguments;
}
function P7_EPMcurrentMark(el){
	var j,i,k,wH,cm=false,mt=['',1,'',''],op,r1,k,kk,tA,aU,pp,a,im;;
	wH=window.location.href;
	if(el.p7opt[12!=1]){
		wH=wH.replace(window.location.search,'');
	}
	if(wH.charAt(wH.length-1)=='#'){
		wH=wH.substring(0,wH.length-1);
	}
	for(k=0;k<p7EPMadv.length;k++){
		if(p7EPMadv[k][0]&&p7EPMadv[k][0]==el.id){
			mt=p7EPMadv[k];
			cm=true;
			break;
		}
	}
	op=mt[1];
	if(op<1){
		return;
	}
	r1=/index\.[\S]*/i;
	k=-1,kk=-1;
	tA=el.getElementsByTagName("A");
	for(j=0;j<tA.length;j++){
		aU=tA[j].href.replace(r1,'');
		if(op>0){
			if(tA[j].href==wH||aU==wH){
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
		if(tA[k].p7EPMpr){
			tr=tA[k];
		}
		else{
			P7_EPMsetClass(tA[k],'current_mark');
			pp=tA[k].parentNode;
			while(pp){
				if(pp.id&&pp.id.indexOf('p7EPMw')==0){
					tr=document.getElementById(pp.p7EPMtrg);
					break;
				}
				pp=pp.parentNode;
			}
		}
		if(tr){
			P7_EPMsetClass(tr,'current_mark');
			P7_EPMsetClass(tr.parentNode,'current_mark');
			if(el.p7opt[11]==1){
				if(tr.p7state!='open'){
					P7_EPMtrig(tr,0,true);
				}
			}
		}
	}
}
function P7_EPMurl(dv){
	var i,h,s,x,d='epm',a,n=dv.replace("p7EPM_","");
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
							a=document.getElementById('p7EPMtrg'+x);
							if(a&&a.p7state!="open"){
								P7_EPMtrig(a,0,true);
							}
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
				a=document.getElementById('p7EPMtrg'+x.substring(3));
				if(a&&a.p7state!="open"){
					P7_EPMtrig(a,0,true);
				}
			}
		}
	}
}
function P7_EPMov(ob){
	var s,m;
	s=ob.style.overflow;
	if(!s){
		if(ob.currentStyle){
			s=ob.currentStyle.overflow;
		}
		else if(document.defaultView.getComputedStyle(ob,"")){
			s=document.defaultView.getComputedStyle(ob,"").getPropertyValue("overflow");
		}
	}
	m=(s&&s=='auto')?true:false;
	return m;
}
function P7_EPMsetClass(ob,cl){
	var cc,nc,r=/\s+/g;
	cc=ob.className;
	nc=cl;
	if(cc&&cc.length>0){
		if(cc.indexOf(cl)==-1){
			nc=cc+' '+cl;
		}
		else{
			return;
		}
	}
	nc=nc.replace(r,' ');
	ob.className=nc;
}
function P7_EPMremClass(ob,cl){
	var cc,nc,r=/\s+/g;;
	cc=ob.className;
	if(cc&&cc.indexOf(cl>-1)){
		nc=cc.replace(cl,'');
		nc=nc.replace(r,' ');
		ob.className=nc;
	}
}
