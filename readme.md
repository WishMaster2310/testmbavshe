# DevCon2016
Каркас верстки на базе [Nunjucks][link1]
по этому не стесняемся и используем в разметке Циклы и прочие прелести жизни;

Допускается объявление данных, непосредственно в шаблоне типа:

```

{# при этом сбособе контролируй whitespace в тегах (т.е. ставь %- -%) #}
{%- set formats = [{
			name: 'Технологический доклад',
			caption: 'Лекция от эксперта Microsoft или индустрии с QA-блоком',
			icon: 'techdocw'
		},{
			name: 'Мастер-класс',
			caption: 'Двухчасовое погружение в тему, сочетающее теорию и практику',
			icon: 'lopataw'
		},{
			name: 'Интенсив',
			caption: 'Разработанный в&nbsp;секретных лабораториях коктейль из&nbsp;теории, практики и&nbsp;общения с&nbsp;экспертами Microsoft. Каждый интенсив&nbsp;&mdash; это ограниченная по&nbsp;количеству участников активность (до&nbsp;50&nbsp;человек), рассчитанная на&nbsp;6&nbsp;часов, в&nbsp;течение которых вы&nbsp;будете думать, работать с&nbsp;кодом и&nbsp;создавать свои собственные проекты',
			icon: 'armw'
		},{
			name: 'Интерактивная выставка',
			caption: 'Технологическая выставка DevCon соберет под открытым небом интереснейшие инновации от&nbsp;Microsoft и&nbsp;партнеров. Вы&nbsp;также сможете пообщаться с&nbsp;экспертами в&nbsp;неформальной обстановке и&nbsp;поучаствовать в&nbsp;дискуссиях в&nbsp;формате Chalk-talk',
			icon: 'circusw'
		}] -%}


{# сама вьюха может выглядеть как-то так #}
<ul class="keythems">
	{% for item in formats %}
		<li class="keythems-item">
			<div class="keythems-item__icon">
				<span class="sprite-icon-{{ item.icon }} keythems-item__icon-abs"></span>
			</div>
			<p class="keythems-item__name">{{ item.name|safe }}</p>
			<p class="keythems-item__text">{{ item.caption|safe }}</p>
		</li>
	{% endfor %}
</ul>
```

Либо, заносим данные в файлик ./datasource/sdata.json, который передается контекстом для каждой страницы. До этих данных можно добраться через ключик ctx

```
{% for item in ctx.foo %}
	{{ item.baz }} / {{ item.bar }}
{% endfor %}
```


## Gulp

Таск для запуска вотчера
```sh
$ gulp
```
Таск для *деплоя* (так же афтопрефиксер ксс и тп)
```sh
$ gulp publish
```


> все шаблоны соберутся в папке export; 
> пути к картинкам заменятся на Razor'вские @File('path'); 
> (останется только скопировать и вставить)
> Разметка лэйаута в экспорт **не попадет**

**После деплоя, обязательно коммитися и пушимся в репу**
[link1]: <https://mozilla.github.io/nunjucks/templating.html >