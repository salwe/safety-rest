
 <header>

	<div id="main_menu_new">
        <?$APPLICATION->IncludeComponent("bitrix:menu", "horizontal_new", array(
            "ROOT_MENU_TYPE" => "top",
            "IBLOCK_ID" => "1",
            "MENU_CACHE_TYPE" => "Y",
            "MENU_CACHE_TIME" => "36000000",
            "MENU_CACHE_USE_GROUPS" => "Y",
            "MENU_CACHE_GET_VARS" => array(
            ),
            "MAX_LEVEL" => "2",
            "CHILD_MENU_TYPE" => "left",
            "USE_EXT" => "N",
            "ALLOW_MULTI_SELECT" => "N"
        ),
        false
    );?>
    </div>



    <div class="logo">
    <a href="/"><img src="/bitrix/templates/corp_services_blue/images/new/logo-safety-of-rest.png" alt="Логотип Safety Of Rest" title="Логотип Safety Of Rest" ></a>
    </div>


    <div class="buyonline_block">
    <span>Онлайн страхование выезжающих за рубеж</span>
    <a href="/orderonline.php" class="buyonline_button buyonline_req">Купить полис онлайн</a>
    </div>


    <div class="contact_block">
    <span class="phone_label"><a data-href="+74957993282"><span class="tel_code">+7 (495) </span>799-32-82</a><span class="city">(Москва)</span></span>
    <a href="mailto:support@safety-rest.ru" class="email_link">support@safety-rest.ru</a>
    <div id="header_search">
	<form action="/search/index.php">
		<table border="0" cellspacing="0" cellpadding="2" align="center">
			<tbody><tr>
				<td align="center">
				<input class="input" type="text" name="q" size="15" maxlength="50" value="Поиск по сайту" onblur="if(this.value=='') this.value='Поиск по сайту';" onfocus="if(this.value=='Поиск по сайту') this.value='';">
				<input name="s" class="submit" type="submit" value="Поиск"></td>
			</tr>
		</tbody></table>
	</form>
	</div>

    </div>

    <div class="callback_block">
    <span class="phone_label"><a data-href="tel:88005503282"><span>8-800-</span>550-32-82</a></span>
    <span class="note">(Бесплатный звонок по России)</span>
    <a href="#" onclick="return false;" class="callback_button callback_req">Перезвонить Вам?</a>
    </div>
</header>
