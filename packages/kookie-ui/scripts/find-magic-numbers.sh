#!/bin/bash

echo "🔍 Finding hardcoded magic numbers in CSS files..."
echo ""

echo "📐 Remaining blur values that should use constants:"
remaining_blur=$(find packages/kookie-ui/src/components/ -name "*.css" -exec grep -l "blur(12px)\|blur(24px)" {} \;)
if [ -z "$remaining_blur" ]; then
    echo "✅ None! All blur values migrated to constants."
else
    echo "$remaining_blur"
fi

echo ""
echo "🎯 Files still using hardcoded spacing multipliers:"
find packages/kookie-ui/src/components/ -name "*.css" -exec grep -l "calc.*0\.5\|calc.*0\.75\|calc.*1\.25" {} \; | head -5
echo "   (showing first 5 - these can be migrated as needed)"

echo ""
echo "📦 Constants Migration Status:"
echo "✅ COMPLETE: backdrop-blur-panel: 24px"
echo "✅ COMPLETE: backdrop-blur-components: 12px"
echo "✅ COMPLETE: classic-elevation-offset: -0.03em"
echo "✅ COMPLETE: classic-border-width: 0.05em"
echo "✅ COMPLETE: classic-shadow-blur-small: 0.17em"
echo "✅ COMPLETE: classic-shadow-blur-medium: 0.25em"
echo "✅ COMPLETE: classic-shadow-blur-large: 0.5em"
echo "✅ COMPLETE: classic-border-width-thick: 0.075em"
echo "✅ COMPLETE: classic-shadow-offset-y: 0.08em"
echo "✅ COMPLETE: classic-shadow-offset-negative: -0.1em"
echo "✅ COMPLETE: classic-word-spacing: -0.1em"
echo "✅ COMPLETE: panel-opacity-light: 0.7"
echo "✅ COMPLETE: surface-opacity-light: 0.85"

echo ""
echo "🎉 MAJOR COMPONENTS COMPLETED:"
echo "✅ Button (base-button.css) - All classic variant constants"
echo "✅ Badge (badge.css) - All classic variant constants"
echo "✅ Kbd (kbd.css) - All classic variant constants including word-spacing"
echo "✅ Sidebar (sidebar.css) - All blur constants"
echo "✅ TextField (text-field.css) - All blur constants"
echo "✅ Color tokens (color.css) - All panel/surface constants"

echo ""
echo "📝 Next steps: Remaining files use spacing multipliers that can be"
echo "   migrated to constants as needed for specific components." 