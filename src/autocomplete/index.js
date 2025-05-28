import './index.css'
$.fn.autocomplete = function(options) {
    // 默认配置
    const settings = $.extend({
        source: [], // 数据源
        minLength: 1, // 触发自动完成的最小输入长度
        select: function(event, ui) {} // 选择项时的回调函数
    }, options);

    return this.each(function() {
        const $input = $(this);
        const $suggestions = $('<ul class="autocomplete-suggestions"></ul>').hide().insertAfter($input);

        // 监听输入事件
        $input.on('input', function() {
            const term = $input.val().toLowerCase();
            if (term.length < settings.minLength) {
                $suggestions.hide();
                return;
            }

            // 筛选匹配项
            const matches = settings.source.filter(item =>
                item.toLowerCase().includes(term)
            );

            // 渲染建议列表
            if (matches.length > 0) {
                const html = matches.map(item => `<li>${item}</li>`).join('');
                $suggestions.html(html).show();
            } else {
                $suggestions.hide();
            }
        });

        // 处理选择项事件
        $suggestions.on('click', 'li', function() {
            const value = $(this).text();
            $input.val(value);
            $suggestions.hide();
            settings.select(null, { item: { value } });
        });

        // 点击其他地方隐藏建议列表
        $(document).on('click', function(event) {
            if (!$(event.target).closest($input).length && !$(event.target).closest($suggestions).length) {
                $suggestions.hide();
            }
        });
    });
};

