<!-- BEGIN #sidebar -->
<div id="sidebar" class="app-sidebar">
    <!-- BEGIN scrollbar -->
    <div class="app-sidebar-content" data-scrollbar="true" data-height="100%">
        <!-- BEGIN menu -->
        <div class="menu">
            @php
				$currentUrl = (Request::path() != '/') ? '/'. Request::path() : '/';

				function renderSubMenu($value, $currentUrl) {
					$subMenu = '';
					$GLOBALS['sub_level'] += 1 ;
					$GLOBALS['active'][$GLOBALS['sub_level']] = '';
					$currentLevel = $GLOBALS['sub_level'];
					foreach ($value as $key => $menu) {
						$GLOBALS['childparent_level'] = '';

						$subSubMenu = '';
						$hasSub = (!empty($menu['children'])) ? 'has-sub' : '';
						$menuUrl = (!empty($menu['url'])) ? $menu['url'] : '';
					    $menuCaret = (!empty($hasSub)) ? '<span class="menu-caret"><b class="caret"></b></span>' : '';
						$menuText = (!empty($menu['text'])) ? '<span class="menu-text">'. $menu['text'] .'</span>' : '';

						if (!empty($menu['children'])) {
							$subSubMenu .= '<div class="menu-submenu">';
							$subSubMenu .= renderSubMenu($menu['children'], $currentUrl);
							$subSubMenu .= '</div>';
						}

						$active = ($currentUrl == $menuUrl) ? 'active' : '';
						if ($active) {
							$GLOBALS['parent_active'] = true;
							$GLOBALS['active'][$GLOBALS['sub_level'] - 1] = true;
						}
						if (!empty($GLOBALS['active'][$currentLevel])) {
							$active = 'active';
						}

						$subMenu .= '
							<div class="menu-item '. $hasSub .' '. $active .'">
								<a href="'. $menuUrl .'" class="menu-link">'. $menuText . $menuCaret .'</a>
								'. $subSubMenu .'
							</div>
						';
					}
					return $subMenu;
				}

				foreach (config('sidebar.menu') as $key => $menu) {
					$GLOBALS['parent_active'] = '';

					$hasSub = (!empty($menu['children'])) ? 'has-sub' : '';
					$menuUrl = (!empty($menu['url'])) ? $menu['url'] : '';
					$menuLabel = (!empty($menu['label'])) ? '<span class="menu-icon-label">'. $menu['label'] .'</span>' : '';
					$menuIcon = (!empty($menu['icon'])) ? '<span class="menu-icon"><i class="'. $menu['icon'] .'"></i>'. $menuLabel .'</span>' : '';
					$menuText = (!empty($menu['text'])) ? '<span class="menu-text">'. $menu['text'] .'</span>' : '';
					$menuCaret = (!empty($hasSub)) ? '<span class="menu-caret"><b class="caret"></b></span>' : '';
					$menuSubMenu = '';

					if (!empty($menu['children'])) {
						$GLOBALS['sub_level'] = 0;
						$menuSubMenu .= '<div class="menu-submenu">';
						$menuSubMenu .= renderSubMenu($menu['children'], $currentUrl);
						$menuSubMenu .= '</div>';
					}
					$active = (!empty($menu['url']) && $currentUrl == $menu['url']) ? 'active' : '';
					$active = (empty($active) && !empty($GLOBALS['parent_active'])) ? 'active' : $active;

					if (!empty($menu['is_header'])) {
					    echo '<div class="menu-header">'. $menuText .'</div>';
					} else if (!empty($menu['is_divider'])) {
					    echo '<div class="menu-divider"></div>';
					} else {
                        echo '
                            <div class="menu-item '. $hasSub .' '. $active .'">
                                <a href="'. $menuUrl .'" class="menu-link">
                                    '. $menuIcon .'
                                    '. $menuText .'
                                    '. $menuCaret .'
                                </a>
                                '. $menuSubMenu .'
                            </div>
                        ';
                    }
				}
			@endphp
        </div>
        <!-- END menu -->
    </div>
    <!-- END scrollbar -->

    <!-- BEGIN mobile-sidebar-backdrop -->
    <button class="app-sidebar-mobile-backdrop" data-dismiss="sidebar-mobile"></button>
    <!-- END mobile-sidebar-backdrop -->
</div>
<!-- END #sidebar -->
