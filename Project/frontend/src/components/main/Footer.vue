<template>
    <footer>
        <div class="footer-top">
            <div class="footer-top-left">
                <address>
                    <p>
                        <span>대표이사 | </span>
                        <span>대구광역시 중구 중앙대로 403 5층</span>
                    </p>
                    <p>
                        <span>사업자 등록 번호 xxx-xx-xxxxx </span>
                        <span></span>
                    </p>
                </address>
            </div>
            <div class="footer-top-right">
                <dl>
                    <dt>고객센터</dt>
                    <dd class="number" style="color: #00317a">053-421-2460</dd>
                    <dd>
                        월~금 09:00 ~ 18:00
                        <br>
                        (점심시간 1:10 ~ 2:20)
                        <br>
                        (토/일 공휴일 휴무)
                    </dd>
                </dl>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy copyright2024</p>
        </div>
    </footer>
</template>
<style>
    footer{
        width:100%;
        height:auto;
        padding:30px;
        /* bottom:-100px; */
        position: absolute;
        margin-top: 50px;
        background-color: rgba(100,100,100,0.1);
    }

    .footer-top{
        width:70%;
        margin:auto;
        display:flex;
        justify-content: space-between;
    }

    .footer-top-left{
        display: flex;
        align-items: center;
    }

    .footer-top-right{
        display: flex;
        align-items: center;
    }
    .number{
        font-size: 22px;
        font-weight: bold;
    }

    .footer-bottom{
        width:70%;
        margin:auto;
        
    }
</style>