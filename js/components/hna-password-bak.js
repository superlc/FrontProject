/**
 * Created by cluo on 2016/12/15.
 */
/**
 * 组件：hna-password-dialog
 * 描述：用户输入密码场景
 * */
define(function () {
    return {
        name : 'hna-password-dialog',
        props : {
                //标题
                title : {
                    type : String,
                    default : '请输入信息'
                },
                //多少个输入的格子
                count : {
                    type : Number,
                    default : 6
                },
                //是否需要确认按钮
                hasbutton : {
                    type : Boolean,
                    default : true
                }
            },
        data : function () {
                return {
                    code : '',
                    //按钮是否可点击
                    isActive : false
                }
            },
        computed :{
                codeArr : function () {
                    var ret = [];
                    var count = this.count;
                    for(var i = 0 ; i < count ; i++){
                        ret[i] = this.code[i];
                    }
                    return ret;
                }
            },
        template : '<div class="hna-passwordDialog">\
                        <p class="hna-password-title">{{title}}</p>\
                        <div class="password-view-wrapper">\
                            <div class="password-view">\
                                <div class="password-item" v-bind:class="{dot : codeArr[i-1]}" v-for="i in count" v-bind:style="{width:100/count + \'%\'}"></div>\
                            </div>\
                            <label class="input-trigger"><input type="tel" v-bind:maxlength="count" v-bind:value="code" v-on:input="chargeInput"></label>\
                        </div>\
                        <div class="btn-wrapper" v-if="hasbutton">\
                            <button class="hna-button btn-large btn-strong" v-bind:class="{dis : !isActive} " v-on:click.prevent="submit">确定</button>\
                        </div>\
                        <div class="hna-password-numbers">\
                        <div class="hna-numbers">\
                            <div class="hna-virtual-number hna-item-number" data-number="1" v-on:click.capture.stop="inputNumber">\
                                <span>1</span>\
                            </div>\
                            <div class="hna-virtual-number hna-item-number" data-number="2" v-on:click.capture.stop="inputNumber">\
                                <span>2</span>\
                            </div>\
                            <div class="hna-virtual-number hna-item-number" data-number="3" v-on:click.capture.stop="inputNumber">\
                                <span>3</span>\
                            </div>\
                        </div>\
                        <div class="hna-numbers">\
                            <div class="hna-virtual-number hna-item-number" data-number="4" v-on:click.capture.stop="inputNumber">\
                                <span>4</span>\
                            </div>\
                            <div class="hna-virtual-number hna-item-number" data-number="5" v-on:click.capture.stop="inputNumber">\
                                <span>5</span>\
                            </div>\
                            <div class="hna-virtual-number hna-item-number" data-number="6" v-on:click.capture.stop="inputNumber">\
                                <span>6</span>\
                            </div>\
                        </div>\
                        <div class="hna-numbers">\
                            <div class="hna-virtual-number hna-item-number" data-number="7" v-on:click.capture.stop="inputNumber">\
                                <span>7</span>\
                            </div>\
                            <div class="hna-virtual-number hna-item-number" data-number="8" v-on:click.capture.stop="inputNumber">\
                                <span>8</span>\
                            </div>\
                            <div class="hna-virtual-number hna-item-number" data-number="9" v-on:click.capture.stop="inputNumber">\
                                <span>9</span>\
                            </div>\
                        </div>\
                        <div class="hna-numbers">\
                            <div class="hna-virtual-number hna-op hna-op-empty">\
                                <span></span>\
                            </div>\
                            <div class="hna-virtual-number hna-item-number" data-number="0" v-on:click.capture.stop="inputNumber">\
                                <span>0</span>\
                            </div>\
                            <div class="hna-virtual-number hna-op hna-op-del" v-on:click.capture.stop="delNumber">\
                                <span class="ico-del"></span>\
                            </div>\
                        </div>\
                    </div>\
                </div>',
        methods : {
            chargeInput : function (e) {
                var _this = e.target || e.srcElement;
                //判断输入的值是否整数
                this.code = _this.value;
                if(this.code.length >= this.count){
                    this.isActive = true;
                    if(!this.hasbutton){
                        this.validCode(this.code);
                    }
                }else{
                    this.isActive = false;
                }
            },
            submit : function (e) {
                var _this = e.target || e.srcElement;
                var code = this.code;
                //按钮不可点击的状态直接不操作
                if(_this.classList.contains('dis')){
                    return;
                }
                //判断是否输出符合长度的密码、验证码
                if(code.length < this.count){
                    console.log('请输入符合长度的数值');
                    return;
                }
                //校验code
                this.validCode(code);
            },
            validCode : function (code) {
                //验证输入的数值是否正确
                if(/^\d+$/g.test(code)){
                    this.$emit('complete',code);
                }else{
                    this.$emit('error',code);
                }
            },
            inputNumber : function (e) {
                var item = e.currentTarget;
                var number = item.dataset.number;

            }
        }
    }
});