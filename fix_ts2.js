const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
        console.log("Not found:", fullPath);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;
    for (const {from, to} of replacements) {
        content = content.replace(from, to);
    }
    if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log("Updated", filePath);
    }
}

// 1. Fix formatPrice in all TSX files
function fixFormatPrice(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                fixFormatPrice(fullPath);
            }
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('const formatPrice = (val: number) => {')) {
                content = content.replace(
                    /const formatPrice = \(val: number\) => \{/g,
                    'const formatPrice = (val?: number) => { val = val || 0;'
                );
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log("Fixed formatPrice in", fullPath);
            }
        }
    }
}
fixFormatPrice(path.join(__dirname, 'app'));
fixFormatPrice(path.join(__dirname, 'components'));

// 2. Fix orderStatus
replaceInFile('app/account/orders/page.tsx', [
    { from: /ord\.orderStatus\.replace/g, to: '(ord.orderStatus || ord.status).replace' }
]);
replaceInFile('app/account/page.tsx', [
    { from: /ord\.orderStatus\.replace/g, to: '(ord.orderStatus || ord.status).replace' },
    { from: /ord\.orderStatus ===/g, to: '(ord.orderStatus || ord.status) ===' },
    { from: /ord\.orderStatus\)/g, to: '(ord.orderStatus || ord.status))' }
]);

// 3. Fix app/account/quotes/[id]/page.tsx (unknown -> ReactNode)
replaceInFile('app/account/quotes/[id]/page.tsx', [
    { from: /<span className="font-mono text-slate-900">{val}<\/span>/g, to: '<span className="font-mono text-slate-900">{String(val)}</span>' }
]);

// 4. Fix app/admin/products/page.tsx
replaceInFile('app/admin/products/page.tsx', [
    { from: /setProductName\(product\.name\)/g, to: 'setProductName(product.name || "")' },
    { from: /setSku\(product\.sku\)/g, to: 'setSku(product.sku || "")' },
    { from: /setPrice\(product\.price\)/g, to: 'setPrice(product.price || 0)' },
    { from: /setCategoryId\(product\.categoryId\)/g, to: 'setCategoryId(product.categoryId || "")' },
    { from: /setHsnCode\(product\.hsnCode\)/g, to: 'setHsnCode(product.hsnCode || "")' }
]);

// 5. Fix checkout OrderItem assignment
replaceInFile('app/checkout/page.tsx', [
    { from: /productId: item\.productId,/g, to: 'productId: item.productId || item.product.id,' }
]);

// 6. Fix missing requiredDeliveryDate in types.ts
replaceInFile('lib/types.ts', [
    { from: /notes\?: string;\n(\s*\/\/ Admin filled)/g, to: 'notes?: string;\n  requiredDeliveryDate?: string;\n$1' }
]);

// 7. Fix lib/store.ts
replaceInFile('lib/store.ts', [
    { from: /orderStatus: 'confirmed',/g, to: "status: 'confirmed',\n          orderStatus: 'confirmed'," },
    { from: /orders: \[createdOrder, \.\.\.memoryState\.orders\]/g, to: 'orders: [createdOrder as Order, ...memoryState.orders]' }
]);
