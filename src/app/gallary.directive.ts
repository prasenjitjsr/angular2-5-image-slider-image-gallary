import { Directive, ElementRef, AfterViewInit, Input, HostListener,Renderer2 } from '@angular/core';

@Directive({
    selector: '[gallarySlide]'
})

export class GallaryDirective implements AfterViewInit{
    @Input() gallarySlide:string;
    @Input('gallaryBoxID') gallaryBoxID:string;
    @Input('item-md') itemMd:number;
    @Input('item-sm') itemSm:number;
    @Input('item-xs') itemXs:number;
    @Input('autoplay') autoplay:boolean;
    @Input('speed') speed:number;
    
    slidePosition:number = 0;
    slideItemWidth:number;
    noOfSlideItem:number;
    itemInOneSlide:number;
    item:HTMLElement;
    currentSlide:number=0;

    @HostListener('click', ['$event.target']) onClick($event){
        if($event.attributes.class.nodeValue){
            var clickBtn = $event.attributes.class.nodeValue;
        }
        if(clickBtn.indexOf('prevbtn') !== -1){
            this.nextSlide();
        }
        if(clickBtn.indexOf('nextbtn') !== -1){
            this.prevSlide()
        }
        if(clickBtn.indexOf('dotBox') !== -1){
            var parent=this._renderer.parentNode;
            const element = this._renderer.selectRootElement('.dotBox.active'); 
            //this._renderer.removeClass(parent,'active');
            this._renderer.removeClass(element,'active');
            this._renderer.addClass($event,'active');
            let slideto=$event.attributes.slideto.nodeValue;
            this.currentSlide=slideto;
            this.slideGallaryTo(this.currentSlide);
        }
        
    }
    @HostListener('swipeleft', ['$event.type']) onSwipeLeft($event){
        this.prevSlide();
    }
    @HostListener('swiperight', ['$event.type']) onSwipeRight($event){
        this.nextSlide();
    }

    constructor (private _renderer:Renderer2, private el:ElementRef){}

    ngAfterViewInit(){
        if(!this.itemMd){this.itemMd=3;} if(!this.itemSm){this.itemSm=2;} if(!this.itemXs){this.itemXs=1;}
        if(!this.speed){this.speed=4000;} if(!this.autoplay){this.autoplay=false;}
        this.gallaryLength(this.el.nativeElement, this.gallarySlide);
        if(this.autoplay){
            setInterval(()=>{
                if(this.currentSlide < (this.noOfSlideItem-1)){
                    this.currentSlide+=1;
                }else{
                    this.currentSlide=0;
                }
                console.log(this.currentSlide);
                this.slideGallaryTo(this.currentSlide);
            },this.speed);
        }
    }

    @HostListener('window:resize') 
    onResize() {
        this.slidePosition = 0;
        let removeChild=this.el.nativeElement.getElementsByClassName('dots-control')[0];
        this._renderer.removeChild(this.el.nativeElement,removeChild);
        this.gallaryLength(this.el.nativeElement, this.gallarySlide);
    }
    gallaryLength(parent: HTMLElement, className: string){
        if (!parent) return;
        this.slideItemWidth=parent.offsetWidth;
        this.item=this.el.nativeElement.getElementsByClassName('items')[0];
        const children = this.item.getElementsByClassName(className);

        if (!children) return;
        this.noOfSlideItem=children.length;

        let documentWidth=document.body.offsetWidth;
        if(documentWidth>991){
            this.noOfSlideItem=Math.ceil(this.noOfSlideItem/this.itemMd);
            this.itemInOneSlide=this.itemMd;
        }else if(documentWidth>767){
            this.noOfSlideItem=Math.ceil(this.noOfSlideItem/this.itemSm);
            this.itemInOneSlide=this.itemSm;
        }else{
            this.noOfSlideItem=Math.ceil(this.noOfSlideItem/this.itemXs);
            this.itemInOneSlide=this.itemXs;
        }
        let slideWidth= (100/this.itemInOneSlide);
        for(let i=0; i<children.length; i++){
            children[i].setAttribute('style','width:'+ slideWidth +'% !important');
        };
        
        var divElement=this._renderer.createElement('div');
        this._renderer.addClass(divElement,"dots-control");
        for(let i=0; i<this.noOfSlideItem; i++){
            var childDot=this._renderer.createElement('div');
            this._renderer.addClass(childDot,"dotBox");
            if(i==0){
                this._renderer.addClass(childDot,"active");
            }
            this._renderer.setAttribute(childDot,"slideto",""+i);
            this._renderer.appendChild(divElement,childDot);
        }
        this._renderer.appendChild(parent,divElement);
        
        this.slideGallary();
    }
    
    slideGallary(){
        this.item.style.transform =
        'translate3d(' + (-this.slidePosition * this.slideItemWidth) + 'px,0,0)';
    }
    slideGallaryTo(item:number){
            this.slidePosition=item;
        this.item.style.transform =
        'translate3d(' + (-this.slidePosition * this.slideItemWidth) + 'px,0,0)';
    }
    nextSlide(){
        this.slidePosition = Math.max(this.slidePosition - 1, 0);
        this.slideGallary();
    }
    prevSlide(){
        this.slidePosition = Math.min(this.slidePosition + 1, this.noOfSlideItem - 1);
        this.slideGallary();
    }
};
