"use strict";
var main;
(function($rt_globals) {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    if (to.$meta.item !== null) {
        return from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_castToInterface(obj, cls) {
    if (obj !== null && !$rt_isInstance(obj, cls)) {
        $rt_throwCCE();
    }
    return obj;
}
function $rt_castToClass(obj, cls) {
    if (obj !== null && !(obj instanceof cls)) {
        $rt_throwCCE();
    }
    return obj;
}
$rt_globals.Array.prototype.fill = $rt_globals.Array.prototype.fill || function(value, start, end) {
    var len = this.length;
    if (!len) return this;
    start = start | 0;
    var i = start < 0 ? $rt_globals.Math.max(len + start, 0) : $rt_globals.Math.min(start, len);
    end = end === $rt_globals.undefined ? len : end | 0;
    end = end < 0 ? $rt_globals.Math.max(len + end, 0) : $rt_globals.Math.min(end, len);
    for (;i < end;i++) {
        this[i] = value;
    }
    return this;
};
function $rt_createArray(cls, sz) {
    var data = new $rt_globals.Array(sz);
    data.fill(null);
    return new $rt_array(cls, data);
}
function $rt_createArrayFromData(cls, init) {
    return $rt_wrapArray(cls, init);
}
function $rt_wrapArray(cls, data) {
    return new $rt_array(cls, data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new $rt_array(cls, new $rt_globals.Array(sz));
}
function $rt_createNumericArray(cls, nativeArray) {
    return new $rt_array(cls, nativeArray);
}
var $rt_createLongArray;
var $rt_createLongArrayFromData;
if (typeof $rt_globals.BigInt64Array !== 'function') {
    $rt_createLongArray = function(sz) {
        var data = new $rt_globals.Array(sz);
        var arr = new $rt_array($rt_longcls(), data);
        data.fill(Long_ZERO);
        return arr;
    };
    $rt_createLongArrayFromData = function(init) {
        return new $rt_array($rt_longcls(), init);
    };
} else {
    $rt_createLongArray = function(sz) {
        return $rt_createNumericArray($rt_longcls(), new $rt_globals.BigInt64Array(sz));
    };
    $rt_createLongArrayFromData = function(data) {
        var buffer = new $rt_globals.BigInt64Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_longcls(), buffer);
    };
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new $rt_globals.Uint16Array(sz));
}
function $rt_createCharArrayFromData(data) {
    var buffer = new $rt_globals.Uint16Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_charcls(), buffer);
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new $rt_globals.Int8Array(sz));
}
function $rt_createByteArrayFromData(data) {
    var buffer = new $rt_globals.Int8Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_bytecls(), buffer);
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new $rt_globals.Int16Array(sz));
}
function $rt_createShortArrayFromData(data) {
    var buffer = new $rt_globals.Int16Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_shortcls(), buffer);
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new $rt_globals.Int32Array(sz));
}
function $rt_createIntArrayFromData(data) {
    var buffer = new $rt_globals.Int32Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_intcls(), buffer);
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new $rt_globals.Int8Array(sz));
}
function $rt_createBooleanArrayFromData(data) {
    var buffer = new $rt_globals.Int8Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_booleancls(), buffer);
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new $rt_globals.Float32Array(sz));
}
function $rt_createFloatArrayFromData(data) {
    var buffer = new $rt_globals.Float32Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_floatcls(), buffer);
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new $rt_globals.Float64Array(sz));
}
function $rt_createDoubleArrayFromData(data) {
    var buffer = new $rt_globals.Float64Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_doublecls(), buffer);
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = {  };
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
var $rt_javaExceptionProp = $rt_globals.Symbol("javaException");
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        var javaCause = $rt_throwableCause(ex);
        var jsCause = javaCause !== null ? javaCause.$jsException : $rt_globals.undefined;
        var cause = typeof jsCause === "object" ? { cause : jsCause } : $rt_globals.undefined;
        err = new JavaError("Java exception thrown", cause);
        if (typeof $rt_globals.Error.captureStackTrace === "function") {
            $rt_globals.Error.captureStackTrace(err);
        }
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_stecls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && $rt_globals.isNaN(value)) {
        throw "NaN";
    }
    return value;
}
function $rt_createOutputFunction(printFunction) {
    var buffer = "";
    var utf8Buffer = 0;
    var utf8Remaining = 0;
    function putCodePoint(ch) {
        if (ch === 0xA) {
            printFunction(buffer);
            buffer = "";
        } else if (ch < 0x10000) {
            buffer += $rt_globals.String.fromCharCode(ch);
        } else {
            ch = ch - 0x10000 | 0;
            var hi = (ch >> 10) + 0xD800;
            var lo = (ch & 0x3FF) + 0xDC00;
            buffer += $rt_globals.String.fromCharCode(hi, lo);
        }
    }
    return function(ch) {
        if ((ch & 0x80) === 0) {
            putCodePoint(ch);
        } else if ((ch & 0xC0) === 0x80) {
            if (utf8Buffer > 0) {
                utf8Remaining <<= 6;
                utf8Remaining |= ch & 0x3F;
                if ( --utf8Buffer === 0) {
                    putCodePoint(utf8Remaining);
                }
            }
        } else if ((ch & 0xE0) === 0xC0) {
            utf8Remaining = ch & 0x1F;
            utf8Buffer = 1;
        } else if ((ch & 0xF0) === 0xE0) {
            utf8Remaining = ch & 0x0F;
            utf8Buffer = 2;
        } else if ((ch & 0xF8) === 0xF0) {
            utf8Remaining = ch & 0x07;
            utf8Buffer = 3;
        }
    };
}
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof $rt_globals.console === "object" ? $rt_createOutputFunction(function(msg) {
    $rt_globals.console.info(msg);
}) : function() {
};
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof $rt_globals.console === "object" ? $rt_createOutputFunction(function(msg) {
    $rt_globals.console.error(msg);
}) : function() {
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new $rt_globals.Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = $rt_globals.Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            var enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            var declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            var simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_wrapFunction0(f) {
    return function() {
        return f(this);
    };
}
function $rt_wrapFunction1(f) {
    return function(p1) {
        return f(this, p1);
    };
}
function $rt_wrapFunction2(f) {
    return function(p1, p2) {
        return f(this, p1, p2);
    };
}
function $rt_wrapFunction3(f) {
    return function(p1, p2, p3) {
        return f(this, p1, p2, p3, p3);
    };
}
function $rt_wrapFunction4(f) {
    return function(p1, p2, p3, p4) {
        return f(this, p1, p2, p3, p4);
    };
}
function $rt_threadStarter(f) {
    return function() {
        var args = $rt_globals.Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new $rt_globals.Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new $rt_globals.DataView(new $rt_globals.ArrayBuffer(8));
var $rt_doubleToLongBits;
var $rt_longBitsToDouble;
if (typeof $rt_globals.BigInt !== 'function') {
    $rt_doubleToLongBits = function(n) {
        $rt_numberConversionView.setFloat64(0, n, true);
        return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
    };
    $rt_longBitsToDouble = function(n) {
        $rt_numberConversionView.setInt32(0, n.lo, true);
        $rt_numberConversionView.setInt32(4, n.hi, true);
        return $rt_numberConversionView.getFloat64(0, true);
    };
} else {
    $rt_doubleToLongBits = function(n) {
        $rt_numberConversionView.setFloat64(0, n, true);
        var lo = $rt_numberConversionView.getInt32(0, true);
        var hi = $rt_numberConversionView.getInt32(4, true);
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(32, $rt_globals.BigInt(lo)) | $rt_globals.BigInt(hi) << $rt_globals.BigInt(32));
    };
    $rt_longBitsToDouble = function(n) {
        var hi = $rt_globals.Number($rt_globals.BigInt.asIntN(32, n >> $rt_globals.BigInt(32)));
        var lo = $rt_globals.Number($rt_globals.BigInt.asIntN(32, n & $rt_globals.BigInt(0xFFFFFFFF)));
        $rt_numberConversionView.setInt32(0, lo, true);
        $rt_numberConversionView.setInt32(4, hi, true);
        return $rt_numberConversionView.getFloat64(0, true);
    };
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
var JavaError;
if (typeof $rt_globals.Reflect === 'object') {
    var defaultMessage = $rt_globals.Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        var self = $rt_globals.Reflect.construct($rt_globals.Error, [$rt_globals.undefined, cause], JavaError);
        $rt_globals.Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    };
    JavaError.prototype = $rt_globals.Object.create($rt_globals.Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get : function() {
        var javaException = this[$rt_javaExceptionProp];
        if (typeof javaException === 'object') {
            var javaMessage = $rt_throwableMessage(javaException);
            if (typeof javaMessage === "object") {
                return javaMessage.toString();
            }
        }
        return this[defaultMessage];
    } } });
} else {
    JavaError = $rt_globals.Error;
}
function $rt_javaException(e) {
    return e instanceof $rt_globals.Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
var Long_MAX_NORMAL = 1 << 18;
var Long_ZERO;
var Long_create;
var Long_fromInt;
var Long_fromNumber;
var Long_toNumber;
var Long_hi;
var Long_lo;
if (typeof $rt_globals.BigInt !== "function") {
    Long.prototype.toString = function() {
        var result = [];
        var n = this;
        var positive = Long_isPositive(n);
        if (!positive) {
            n = Long_neg(n);
        }
        var radix = new Long(10, 0);
        do  {
            var divRem = Long_divRem(n, radix);
            result.push($rt_globals.String.fromCharCode(48 + divRem[1].lo));
            n = divRem[0];
        }while (n.lo !== 0 || n.hi !== 0);
        result = (result.reverse()).join('');
        return positive ? result : "-" + result;
    };
    Long.prototype.valueOf = function() {
        return Long_toNumber(this);
    };
    Long_ZERO = new Long(0, 0);
    Long_fromInt = function(val) {
        return new Long(val,  -(val < 0) | 0);
    };
    Long_fromNumber = function(val) {
        if (val >= 0) {
            return new Long(val | 0, val / 0x100000000 | 0);
        } else {
            return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
        }
    };
    Long_create = function(lo, hi) {
        return new Long(lo, hi);
    };
    Long_toNumber = function(val) {
        return 0x100000000 * val.hi + (val.lo >>> 0);
    };
    Long_hi = function(val) {
        return val.hi;
    };
    Long_lo = function(val) {
        return val.lo;
    };
} else {
    Long_ZERO = $rt_globals.BigInt(0);
    Long_create = function(lo, hi) {
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(32, $rt_globals.BigInt(lo)) | $rt_globals.BigInt(hi) << $rt_globals.BigInt(32));
    };
    Long_fromInt = function(val) {
        return $rt_globals.BigInt(val);
    };
    Long_fromNumber = function(val) {
        return $rt_globals.BigInt(val >= 0 ? $rt_globals.Math.floor(val) : $rt_globals.Math.ceil(val));
    };
    Long_toNumber = function(val) {
        return $rt_globals.Number(val);
    };
    Long_hi = function(val) {
        return $rt_globals.Number($rt_globals.BigInt.asIntN(64, val >> $rt_globals.BigInt(32))) | 0;
    };
    Long_lo = function(val) {
        return $rt_globals.Number($rt_globals.BigInt.asIntN(32, val)) | 0;
    };
}
var $rt_imul = $rt_globals.Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    return (a >>> 0) / (b >>> 0) >>> 0;
};
var $rt_umod = function(a, b) {
    return (a >>> 0) % (b >>> 0) >>> 0;
};
function $rt_checkBounds(index, array) {
    if (index < 0 || index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_checkUpperBound(index, array) {
    if (index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_checkLowerBound(index) {
    if (index < 0) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_classWithoutFields(superclass) {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
}
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_stecls() {
    return jl_Object;
}
function $rt_throwableMessage(t) {
    return jl_Throwable_getMessage(t);
}
function $rt_throwableCause(t) {
    return jl_Throwable_getCause(t);
}
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return null;
}
function $rt_setThread(t) {
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
function $rt_throwAIOOBE() {
}
function $rt_throwCCE() {
}
var $java = Object.create(null);
function jl_Object() {
    this.$id$ = 0;
}
function jl_Object_getClass($this) {
    return jl_Class_getClass($this.constructor);
}
function jl_Object_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    var$1 = jl_Object_getClass($this);
    if (var$1.$name === null)
        var$1.$name = $rt_str(var$1.$platformClass.$meta.name);
    var$2 = var$1.$name;
    var$1 = $this;
    if (!var$1.$id$) {
        var$3 = $rt_nextId();
        var$1.$id$ = var$3;
    }
    var$4 = $this.$id$;
    if (!var$4)
        var$3 = $rt_s(0);
    else {
        if (!var$4)
            var$5 = 32;
        else {
            var$6 = 0;
            var$5 = var$4 >>> 16;
            if (var$5)
                var$6 = 16;
            else
                var$5 = var$4;
            var$7 = var$5 >>> 8;
            if (!var$7)
                var$7 = var$5;
            else
                var$6 = var$6 | 8;
            var$5 = var$7 >>> 4;
            if (!var$5)
                var$5 = var$7;
            else
                var$6 = var$6 | 4;
            var$7 = var$5 >>> 2;
            if (!var$7)
                var$7 = var$5;
            else
                var$6 = var$6 | 2;
            if (var$7 >>> 1)
                var$6 = var$6 | 1;
            var$5 = (32 - var$6 | 0) - 1 | 0;
        }
        var$5 = (((32 - var$5 | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$8 = $rt_createCharArray(var$5);
        var$9 = var$8.data;
        var$6 = (var$5 - 1 | 0) * 4 | 0;
        var$7 = 0;
        while (var$6 >= 0) {
            var$10 = var$7 + 1 | 0;
            var$9[var$7] = jl_Character_forDigit(var$4 >>> var$6 & 15, 16);
            var$6 = var$6 - 4 | 0;
            var$7 = var$10;
        }
        var$3 = jl_String__init_(var$8);
    }
    var$1 = jl_StringBuilder__init_();
    var$11 = jl_StringBuilder_append(var$1, var$2);
    var$12 = var$11.$length;
    jl_AbstractStringBuilder_insertSpace(var$11, var$12, var$12 + 1 | 0);
    var$11.$buffer.data[var$12] = 64;
    jl_StringBuilder_append(var$11, var$3);
    return jl_StringBuilder_toString(var$1);
}
var mq_Client = $rt_classWithoutFields();
function mq_Client_main($args) {
    var $i, $div, $secondWorker, $endTime, $running, var$7;
    jl_String__clinit_();
    jl_Integer__clinit_();
    jl_Character__clinit_();
    $i = $rt_globals.window.document;
    $div = $i.createElement("div");
    $secondWorker = $i.createTextNode("me working");
    $div.appendChild($secondWorker);
    $i.body.appendChild($div);
    $secondWorker = mqw_Worker_fromScript$js_body$_6("self.onmessage = (message) => { self.postMessage(message.data + 1); };");
    $endTime = Long_add(jl_System_currentTimeMillis(), Long_fromInt(1000));
    $i = new juca_AtomicLong;
    $i.$value = Long_ZERO;
    $running = new juca_AtomicBoolean;
    $running.$value0 = 1;
    var$7 = new mq_Client$main$lambda$_2_0;
    var$7.$_0 = $running;
    var$7.$_1 = $endTime;
    var$7.$_2 = $i;
    var$7.$_3 = $secondWorker;
    $div = otji_JS_function(var$7, "handleEvent");
    $secondWorker.onmessage = $div;
    $div = Long_toNumber($i.$value);
    $secondWorker.postMessage($div);
}
var jlr_AnnotatedElement = $rt_classWithoutFields(0);
var jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
}
function jl_Class_getClass($cls) {
    var $result, var$3;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null) {
        $result = new jl_Class;
        $result.$platformClass = $cls;
        var$3 = $result;
        $cls.classObject = var$3;
    }
    return $result;
}
var otji_JS = $rt_classWithoutFields();
function otji_JS_function(var$1, var$2) {
    var name = 'jso$functor$' + var$2;
    if (!var$1[name]) {
        var fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        var$1[name] = function() {
            return fn;
        };
    }
    return var$1[name]();
}
function otji_JS_functionAsObject(var$1, var$2) {
    if (typeof var$1 !== "function") return var$1;
    var result = {};
    result[var$2] = var$1;
    return result;
}
var otp_Platform = $rt_classWithoutFields();
var ji_Serializable = $rt_classWithoutFields(0);
var jl_Comparable = $rt_classWithoutFields(0);
var jl_CharSequence = $rt_classWithoutFields(0);
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
}
function jl_String__init_0($this, $characters) {
    var var$2, var$3, var$4, $i;
    $characters = $characters.data;
    var$2 = $characters.length;
    var$3 = $rt_createCharArray(var$2);
    var$4 = var$3.data;
    $this.$characters = var$3;
    $i = 0;
    while ($i < var$2) {
        var$4[$i] = $characters[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String_charAt($this, $index) {
    var var$2;
    if ($index >= 0) {
        var$2 = $this.$characters.data;
        if ($index < var$2.length)
            return var$2[$index];
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_equals($this, $str) {
    var $i;
    if ($this === $str)
        return 1;
    if (!($str instanceof jl_String))
        return 0;
    if (jl_String_length($str) != jl_String_length($this))
        return 0;
    $i = 0;
    while ($i < jl_String_length($str)) {
        if (jl_String_charAt($this, $i) != jl_String_charAt($str, $i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
}
function jl_String_hashCode($this) {
    var var$1, var$2, var$3, $c;
    a: {
        if (!$this.$hashCode) {
            var$1 = $this.$characters.data;
            var$2 = var$1.length;
            var$3 = 0;
            while (true) {
                if (var$3 >= var$2)
                    break a;
                $c = var$1[var$3];
                $this.$hashCode = (31 * $this.$hashCode | 0) + $c | 0;
                var$3 = var$3 + 1 | 0;
            }
        }
    }
    return $this.$hashCode;
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_84_0;
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
function jl_Throwable__init_(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_0($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
}
function jl_Throwable_fillInStackTrace($this) {
    return $this;
}
function jl_Throwable_getMessage($this) {
    return $this.$message;
}
function jl_Throwable_getCause($this) {
    var var$1;
    var$1 = $this.$cause;
    if (var$1 === $this)
        var$1 = null;
    return var$1;
}
var jl_Error = $rt_classWithoutFields(jl_Throwable);
var jl_LinkageError = $rt_classWithoutFields(jl_Error);
var jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError);
var jl_Number = $rt_classWithoutFields();
var jl_Integer = $rt_classWithoutFields(jl_Number);
var jl_Integer_TYPE = null;
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length = 0;
}
function jl_AbstractStringBuilder_insert($this, $target, $value, $radix) {
    var $positive, var$5, var$6, var$7, $sz, $pos, $pos_0;
    $positive = 1;
    if (Long_lt($value, Long_ZERO)) {
        $positive = 0;
        $value = Long_neg($value);
    }
    a: {
        var$5 = Long_fromInt($radix);
        if (Long_lt($value, var$5)) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$6 = $this.$buffer.data;
                var$7 = $target + 1 | 0;
                var$6[$target] = 45;
                $target = var$7;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit(Long_lo($value), $radix);
        } else {
            $sz = 1;
            $pos = Long_fromInt(1);
            while (true) {
                $pos_0 = Long_mul($pos, var$5);
                if (Long_le($pos_0, $pos))
                    break;
                if (Long_gt($pos_0, $value))
                    break;
                $sz = $sz + 1 | 0;
                $pos = $pos_0;
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $sz = $target;
            else {
                var$6 = $this.$buffer.data;
                $sz = $target + 1 | 0;
                var$6[$target] = 45;
            }
            while (true) {
                if (Long_le($pos, Long_ZERO))
                    break a;
                var$6 = $this.$buffer.data;
                $target = $sz + 1 | 0;
                var$6[$sz] = jl_Character_forDigit(Long_lo(Long_div($value, $pos)), $radix);
                $value = Long_rem($value, $pos);
                $pos = Long_div($pos, var$5);
                $sz = $target;
            }
        }
    }
    return $this;
}
function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
    var var$3, $sz, $i, var$6;
    var$3 = $this.$length;
    $sz = var$3 - $start | 0;
    jl_StringBuilder_ensureCapacity($this, (var$3 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$6 = $this.$buffer.data;
        var$6[$end + $i | 0] = var$6[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length = $this.$length + ($end - $start | 0) | 0;
}
var jl_Appendable = $rt_classWithoutFields(0);
var jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder);
function jl_StringBuilder__init_() {
    var var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
}
function jl_StringBuilder__init_0($this) {
    $this.$buffer = $rt_createCharArray(16);
}
function jl_StringBuilder_append($this, $obj) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$length;
    if ($obj === null)
        $obj = $rt_s(1);
    if (var$2 >= 0 && var$2 <= var$2) {
        if (!($obj.$characters.data.length ? 0 : 1)) {
            jl_StringBuilder_ensureCapacity($this, var$2 + jl_String_length($obj) | 0);
            var$3 = $this.$length - 1 | 0;
            while (var$3 >= var$2) {
                $this.$buffer.data[var$3 + jl_String_length($obj) | 0] = $this.$buffer.data[var$3];
                var$3 = var$3 + (-1) | 0;
            }
            $this.$length = $this.$length + jl_String_length($obj) | 0;
            var$4 = 0;
            while (var$4 < jl_String_length($obj)) {
                var$5 = $this.$buffer.data;
                var$6 = var$2 + 1 | 0;
                var$5[var$2] = jl_String_charAt($obj, var$4);
                var$4 = var$4 + 1 | 0;
                var$2 = var$6;
            }
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_StringBuilder_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6;
    var$1 = new jl_String;
    var$2 = $this.$buffer;
    var$3 = $this.$length;
    var$4 = $rt_createCharArray(var$3);
    var$5 = var$4.data;
    var$1.$characters = var$4;
    var$6 = 0;
    while (var$6 < var$3) {
        var$5[var$6] = var$2.data[var$6 + 0 | 0];
        var$6 = var$6 + 1 | 0;
    }
    return var$1;
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$buffer.data.length;
    if (var$2 < var$1) {
        var$1 = var$2 >= 1073741823 ? 2147483647 : jl_Math_max(var$1, jl_Math_max(var$2 * 2 | 0, 5));
        var$3 = $this.$buffer.data;
        var$4 = $rt_createCharArray(var$1);
        var$5 = var$3.length;
        if (var$1 < var$5)
            var$5 = var$1;
        var$6 = var$4.data;
        var$2 = 0;
        while (var$2 < var$5) {
            var$6[var$2] = var$3[var$2];
            var$2 = var$2 + 1 | 0;
        }
        $this.$buffer = var$4;
    }
}
var jl_IncompatibleClassChangeError = $rt_classWithoutFields(jl_LinkageError);
var jl_NoSuchFieldError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchFieldError__init_(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0($this, $message) {
    jl_Throwable__init_0($this, $message);
}
var jl_NoSuchMethodError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchMethodError__init_(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this, $message) {
    jl_Throwable__init_0($this, $message);
}
var jl_Exception = $rt_classWithoutFields(jl_Throwable);
var jl_RuntimeException = $rt_classWithoutFields(jl_Exception);
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_0($this, $message) {
    jl_Throwable__init_0($this, $message);
}
var otj_JSObject = $rt_classWithoutFields(0);
var otjdx_Node = $rt_classWithoutFields(0);
var otjdx_Document = $rt_classWithoutFields(0);
var otjde_EventTarget = $rt_classWithoutFields(0);
var otjdh_HTMLDocument = $rt_classWithoutFields(0);
var otjw_AbstractWorker = $rt_classWithoutFields(0);
var mqw_Worker = $rt_classWithoutFields();
function mqw_Worker_fromScript$js_body$_6(var$1) {
    return new $rt_globals.Worker($rt_globals.URL.createObjectURL(new $rt_globals.Blob([var$1], { type : "text/javascript" })));
}
function mqw_Worker_onError$exported$0(var$0, var$1) {
    var$0.$onError(otji_JS_functionAsObject(var$1, "handleEvent"));
}
function mqw_Worker_addEventListener$exported$1(var$0, var$1, var$2) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function mqw_Worker_removeEventListener$exported$2(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function mqw_Worker_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function mqw_Worker_dispatchEvent$exported$4(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function mqw_Worker_addEventListener$exported$5(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
var jl_System = $rt_classWithoutFields();
function jl_System_currentTimeMillis() {
    return Long_fromNumber(new Date().getTime());
}
function juca_AtomicLong() {
    var a = this; jl_Number.call(a);
    a.$value = Long_ZERO;
    a.$version = 0;
}
function juca_AtomicBoolean() {
    jl_Object.call(this);
    this.$value0 = 0;
}
var otjde_EventListener = $rt_classWithoutFields(0);
function mq_Client$main$lambda$_2_0() {
    var a = this; jl_Object.call(a);
    a.$_0 = null;
    a.$_1 = Long_ZERO;
    a.$_2 = null;
    a.$_3 = null;
}
function mq_Client$main$lambda$_2_0_handleEvent$exported$0(var$0, var$1) {
    var var$2, var$3, var$4, var$5;
    var$2 = var$0.$_0;
    var$3 = var$0.$_1;
    var$4 = var$0.$_2;
    var$5 = var$0.$_3;
    if (var$2.$value0) {
        if (Long_lt(jl_System_currentTimeMillis(), var$3)) {
            var$3 = Long_fromNumber($rt_globals.Number(var$1.data));
            var$4.$value = var$3;
            var$4.$version = var$4.$version + 1 | 0;
            var$1 = Long_toNumber(var$3);
            var$5.postMessage(var$1);
        } else {
            var$2.$value0 = 0;
            var$3 = var$4.$value;
            var$1 = jl_StringBuilder__init_();
            var$2 = jl_StringBuilder_append(var$1, $rt_s(2));
            jl_AbstractStringBuilder_insert(var$2, var$2.$length, var$3, 10);
            jl_StringBuilder_append(var$2, $rt_s(3));
            $rt_globals.alert($rt_ustr(jl_StringBuilder_toString(var$1)));
        }
    }
}
var otjc_JSNumber = $rt_classWithoutFields();
var otci_IntegerUtil = $rt_classWithoutFields();
var otjde_FocusEventTarget = $rt_classWithoutFields(0);
var otjde_MouseEventTarget = $rt_classWithoutFields(0);
var otjde_KeyboardEventTarget = $rt_classWithoutFields(0);
var otjde_LoadEventTarget = $rt_classWithoutFields(0);
var otjde_GamepadEventTarget = $rt_classWithoutFields(0);
var otjb_WindowEventTarget = $rt_classWithoutFields(0);
var otjb_StorageProvider = $rt_classWithoutFields(0);
var otjc_JSArrayReader = $rt_classWithoutFields(0);
var otjb_Window = $rt_classWithoutFields();
function otjb_Window_addEventListener$exported$0(var$0, var$1, var$2) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_removeEventListener$exported$1(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_get$exported$2(var$0, var$1) {
    return var$0.$get(var$1);
}
function otjb_Window_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function otjb_Window_dispatchEvent$exported$4(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function otjb_Window_getLength$exported$5(var$0) {
    return var$0.$getLength();
}
function otjb_Window_addEventListener$exported$6(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
var ju_Comparator = $rt_classWithoutFields(0);
var jl_String$_clinit_$lambda$_84_0 = $rt_classWithoutFields();
var jl_Character = $rt_classWithoutFields();
var jl_Character_TYPE = null;
var jl_Character_characterCache = null;
function jl_Character_forDigit($digit, $radix) {
    if ($radix >= 2 && $radix <= 36 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
var jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException);
var jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
function jl_StringIndexOutOfBoundsException__init_() {
    var var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_StringIndexOutOfBoundsException__init_0($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
}
var jl_Math = $rt_classWithoutFields();
function jl_Math_max($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
var ju_Arrays = $rt_classWithoutFields();
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, 0, 0,
mq_Client, 0, jl_Object, [], 0, 3, 0, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, 0, 0,
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, 0,
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, 0,
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, 0,
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, 0,
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
otjdx_Node, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otjdx_Document, 0, jl_Object, [otjdx_Node], 3, 3, 0, 0, 0,
otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otjdh_HTMLDocument, 0, jl_Object, [otjdx_Document, otjde_EventTarget], 3, 3, 0, 0, 0,
otjw_AbstractWorker, 0, jl_Object, [otj_JSObject, otjde_EventTarget], 3, 3, 0, 0, 0,
mqw_Worker, 0, jl_Object, [otjw_AbstractWorker], 1, 3, 0, 0, ["$onError$exported$0", $rt_wrapFunction1(mqw_Worker_onError$exported$0), "$addEventListener$exported$1", $rt_wrapFunction2(mqw_Worker_addEventListener$exported$1), "$removeEventListener$exported$2", $rt_wrapFunction2(mqw_Worker_removeEventListener$exported$2), "$removeEventListener$exported$3", $rt_wrapFunction3(mqw_Worker_removeEventListener$exported$3), "$dispatchEvent$exported$4", $rt_wrapFunction1(mqw_Worker_dispatchEvent$exported$4), "$addEventListener$exported$5",
$rt_wrapFunction3(mqw_Worker_addEventListener$exported$5)],
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
juca_AtomicLong, 0, jl_Number, [ji_Serializable], 0, 3, 0, 0, 0,
juca_AtomicBoolean, 0, jl_Object, [ji_Serializable], 0, 3, 0, 0, 0,
otjde_EventListener, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
mq_Client$main$lambda$_2_0, 0, jl_Object, [otjde_EventListener], 0, 3, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(mq_Client$main$lambda$_2_0_handleEvent$exported$0)],
otjc_JSNumber, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_GamepadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget, otjde_GamepadEventTarget], 3, 3, 0, 0, 0,
otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0, 0,
otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, 0, ["$addEventListener$exported$0", $rt_wrapFunction2(otjb_Window_addEventListener$exported$0), "$removeEventListener$exported$1", $rt_wrapFunction2(otjb_Window_removeEventListener$exported$1), "$get$exported$2", $rt_wrapFunction1(otjb_Window_get$exported$2), "$removeEventListener$exported$3", $rt_wrapFunction3(otjb_Window_removeEventListener$exported$3), "$dispatchEvent$exported$4", $rt_wrapFunction1(otjb_Window_dispatchEvent$exported$4),
"$getLength$exported$5", $rt_wrapFunction0(otjb_Window_getLength$exported$5), "$addEventListener$exported$6", $rt_wrapFunction3(otjb_Window_addEventListener$exported$6)],
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_84_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, 0]);
$rt_metadata([jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, 0, 0,
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0]);
function $rt_array(cls, data) {
    this.$monitor = null;
    this.$id$ = 0;
    this.type = cls;
    this.data = data;
    this.constructor = $rt_arraycls(cls);
}
$rt_array.prototype = $rt_globals.Object.create(($rt_objcls()).prototype);
$rt_array.prototype.toString = function() {
    var str = "[";
    for (var i = 0;i < this.data.length;++i) {
        if (i > 0) {
            str += ", ";
        }
        str += this.data[i].toString();
    }
    str += "]";
    return str;
};
$rt_setCloneMethod($rt_array.prototype, function() {
    var dataCopy;
    if ('slice' in this.data) {
        dataCopy = this.data.slice();
    } else {
        dataCopy = new this.data.constructor(this.data.length);
        for (var i = 0;i < dataCopy.length;++i) {
            dataCopy[i] = this.data[i];
        }
    }
    return new $rt_array(this.type, dataCopy);
});
$rt_stringPool(["0", "null", "finished benchmark: ", " round trip(s) between worker per second"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
var Long_eq;
var Long_ne;
var Long_gt;
var Long_ge;
var Long_lt;
var Long_le;
var Long_compare;
var Long_add;
var Long_sub;
var Long_inc;
var Long_dec;
var Long_mul;
var Long_div;
var Long_rem;
var Long_udiv;
var Long_urem;
var Long_neg;
var Long_and;
var Long_or;
var Long_xor;
var Long_shl;
var Long_shr;
var Long_shru;
var Long_not;
if (typeof $rt_globals.BigInt !== 'function') {
    Long_eq = function(a, b) {
        return a.hi === b.hi && a.lo === b.lo;
    };
    Long_ne = function(a, b) {
        return a.hi !== b.hi || a.lo !== b.lo;
    };
    Long_gt = function(a, b) {
        if (a.hi < b.hi) {
            return false;
        }
        if (a.hi > b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x > y;
        }
        return (a.lo & 1) > (b.lo & 1);
    };
    Long_ge = function(a, b) {
        if (a.hi < b.hi) {
            return false;
        }
        if (a.hi > b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x >= y;
        }
        return (a.lo & 1) >= (b.lo & 1);
    };
    Long_lt = function(a, b) {
        if (a.hi > b.hi) {
            return false;
        }
        if (a.hi < b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x < y;
        }
        return (a.lo & 1) < (b.lo & 1);
    };
    Long_le = function(a, b) {
        if (a.hi > b.hi) {
            return false;
        }
        if (a.hi < b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x <= y;
        }
        return (a.lo & 1) <= (b.lo & 1);
    };
    Long_add = function(a, b) {
        if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
            return Long_fromNumber(a.lo + b.lo);
        } else if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = a_lolo + b_lolo | 0;
        var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
        var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
        var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
        return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
    };
    Long_inc = function(a) {
        var lo = a.lo + 1 | 0;
        var hi = a.hi;
        if (lo === 0) {
            hi = hi + 1 | 0;
        }
        return new Long(lo, hi);
    };
    Long_dec = function(a) {
        var lo = a.lo - 1 | 0;
        var hi = a.hi;
        if (lo ===  -1) {
            hi = hi - 1 | 0;
        }
        return new Long(lo, hi);
    };
    Long_neg = function(a) {
        return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
    };
    Long_sub = function(a, b) {
        if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
            return Long_fromNumber(a.lo - b.lo);
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = a_lolo - b_lolo | 0;
        var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
        var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
        var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
        return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
    };
    Long_compare = function(a, b) {
        var r = a.hi - b.hi;
        if (r !== 0) {
            return r;
        }
        r = (a.lo >>> 1) - (b.lo >>> 1);
        if (r !== 0) {
            return r;
        }
        return (a.lo & 1) - (b.lo & 1);
    };
    Long_mul = function(a, b) {
        var positive = Long_isNegative(a) === Long_isNegative(b);
        if (Long_isNegative(a)) {
            a = Long_neg(a);
        }
        if (Long_isNegative(b)) {
            b = Long_neg(b);
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = 0;
        var lohi = 0;
        var hilo = 0;
        var hihi = 0;
        lolo = a_lolo * b_lolo | 0;
        lohi = lolo >>> 16;
        lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
        hilo = hilo + (lohi >>> 16) | 0;
        lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
        hilo = hilo + (lohi >>> 16) | 0;
        hihi = hilo >>> 16;
        hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
        var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
        return positive ? result : Long_neg(result);
    };
    Long_div = function(a, b) {
        if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_divRem(a, b))[0];
    };
    Long_udiv = function(a, b) {
        if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_udivRem(a, b))[0];
    };
    Long_rem = function(a, b) {
        if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
        }
        return (Long_divRem(a, b))[1];
    };
    Long_urem = function(a, b) {
        if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_udivRem(a, b))[1];
    };
    function Long_divRem(a, b) {
        if (b.lo === 0 && b.hi === 0) {
            throw new $rt_globals.Error("Division by zero");
        }
        var positive = Long_isNegative(a) === Long_isNegative(b);
        if (Long_isNegative(a)) {
            a = Long_neg(a);
        }
        if (Long_isNegative(b)) {
            b = Long_neg(b);
        }
        a = new LongInt(a.lo, a.hi, 0);
        b = new LongInt(b.lo, b.hi, 0);
        var q = LongInt_div(a, b);
        a = new Long(a.lo, a.hi);
        q = new Long(q.lo, q.hi);
        return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
    }
    function Long_udivRem(a, b) {
        if (b.lo === 0 && b.hi === 0) {
            throw new $rt_globals.Error("Division by zero");
        }
        a = new LongInt(a.lo, a.hi, 0);
        b = new LongInt(b.lo, b.hi, 0);
        var q = LongInt_div(a, b);
        a = new Long(a.lo, a.hi);
        q = new Long(q.lo, q.hi);
        return [q, a];
    }
    function Long_shiftLeft16(a) {
        return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
    }
    function Long_shiftRight16(a) {
        return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
    }
    Long_and = function(a, b) {
        return new Long(a.lo & b.lo, a.hi & b.hi);
    };
    Long_or = function(a, b) {
        return new Long(a.lo | b.lo, a.hi | b.hi);
    };
    Long_xor = function(a, b) {
        return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
    };
    Long_shl = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
        } else if (b === 32) {
            return new Long(0, a.lo);
        } else {
            return new Long(0, a.lo << b - 32);
        }
    };
    Long_shr = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
        } else if (b === 32) {
            return new Long(a.hi, a.hi >> 31);
        } else {
            return new Long(a.hi >> b - 32, a.hi >> 31);
        }
    };
    Long_shru = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
        } else if (b === 32) {
            return new Long(a.hi, 0);
        } else {
            return new Long(a.hi >>> b - 32, 0);
        }
    };
    Long_not = function(a) {
        return new Long(~a.hi, ~a.lo);
    };
    function LongInt(lo, hi, sup) {
        this.lo = lo;
        this.hi = hi;
        this.sup = sup;
    }
    function LongInt_mul(a, b) {
        var a_lolo = (a.lo & 0xFFFF) * b | 0;
        var a_lohi = (a.lo >>> 16) * b | 0;
        var a_hilo = (a.hi & 0xFFFF) * b | 0;
        var a_hihi = (a.hi >>> 16) * b | 0;
        var sup = a.sup * b | 0;
        a_lohi = a_lohi + (a_lolo >>> 16) | 0;
        a_hilo = a_hilo + (a_lohi >>> 16) | 0;
        a_hihi = a_hihi + (a_hilo >>> 16) | 0;
        sup = sup + (a_hihi >>> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup & 0xFFFF;
    }
    function LongInt_sub(a, b) {
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        a_lolo = a_lolo - b_lolo | 0;
        a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
        a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
        a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
        var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup;
    }
    function LongInt_add(a, b) {
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        a_lolo = a_lolo + b_lolo | 0;
        a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
        a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
        a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
        var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup;
    }
    function LongInt_inc(a) {
        a.lo = a.lo + 1 | 0;
        if (a.lo === 0) {
            a.hi = a.hi + 1 | 0;
            if (a.hi === 0) {
                a.sup = a.sup + 1 & 0xFFFF;
            }
        }
    }
    function LongInt_dec(a) {
        a.lo = a.lo - 1 | 0;
        if (a.lo ===  -1) {
            a.hi = a.hi - 1 | 0;
            if (a.hi ===  -1) {
                a.sup = a.sup - 1 & 0xFFFF;
            }
        }
    }
    function LongInt_ucompare(a, b) {
        var r = a.sup - b.sup;
        if (r !== 0) {
            return r;
        }
        r = (a.hi >>> 1) - (b.hi >>> 1);
        if (r !== 0) {
            return r;
        }
        r = (a.hi & 1) - (b.hi & 1);
        if (r !== 0) {
            return r;
        }
        r = (a.lo >>> 1) - (b.lo >>> 1);
        if (r !== 0) {
            return r;
        }
        return (a.lo & 1) - (b.lo & 1);
    }
    function LongInt_numOfLeadingZeroBits(a) {
        var n = 0;
        var d = 16;
        while (d > 0) {
            if (a >>> d !== 0) {
                a >>>= d;
                n = n + d | 0;
            }
            d = d / 2 | 0;
        }
        return 31 - n;
    }
    function LongInt_shl(a, b) {
        if (b === 0) {
            return;
        }
        if (b < 32) {
            a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
            a.hi = a.lo >>> 32 - b | a.hi << b;
            a.lo <<= b;
        } else if (b === 32) {
            a.sup = a.hi & 0xFFFF;
            a.hi = a.lo;
            a.lo = 0;
        } else if (b < 64) {
            a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
            a.hi = a.lo << b;
            a.lo = 0;
        } else if (b === 64) {
            a.sup = a.lo & 0xFFFF;
            a.hi = 0;
            a.lo = 0;
        } else {
            a.sup = a.lo << b - 64 & 0xFFFF;
            a.hi = 0;
            a.lo = 0;
        }
    }
    function LongInt_shr(a, b) {
        if (b === 0) {
            return;
        }
        if (b === 32) {
            a.lo = a.hi;
            a.hi = a.sup;
            a.sup = 0;
        } else if (b < 32) {
            a.lo = a.lo >>> b | a.hi << 32 - b;
            a.hi = a.hi >>> b | a.sup << 32 - b;
            a.sup >>>= b;
        } else if (b === 64) {
            a.lo = a.sup;
            a.hi = 0;
            a.sup = 0;
        } else if (b < 64) {
            a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
            a.hi = a.sup >>> b - 32;
            a.sup = 0;
        } else {
            a.lo = a.sup >>> b - 64;
            a.hi = 0;
            a.sup = 0;
        }
    }
    function LongInt_copy(a) {
        return new LongInt(a.lo, a.hi, a.sup);
    }
    function LongInt_div(a, b) {
        var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
        var sz = 1 + (bits / 16 | 0);
        var dividentBits = bits % 16;
        LongInt_shl(b, bits);
        LongInt_shl(a, dividentBits);
        var q = new LongInt(0, 0, 0);
        while (sz-- > 0) {
            LongInt_shl(q, 16);
            var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
            var digitB = b.hi >>> 16;
            var digit = digitA / digitB | 0;
            var t = LongInt_copy(b);
            LongInt_mul(t, digit);
            if (LongInt_ucompare(t, a) >= 0) {
                while (LongInt_ucompare(t, a) > 0) {
                    LongInt_sub(t, b);
                     --digit;
                }
            } else {
                while (true) {
                    var nextT = LongInt_copy(t);
                    LongInt_add(nextT, b);
                    if (LongInt_ucompare(nextT, a) > 0) {
                        break;
                    }
                    t = nextT;
                    ++digit;
                }
            }
            LongInt_sub(a, t);
            q.lo |= digit;
            LongInt_shl(a, 16);
        }
        LongInt_shr(a, bits + 16);
        return q;
    }
} else {
    Long_eq = function(a, b) {
        return a === b;
    };
    Long_ne = function(a, b) {
        return a !== b;
    };
    Long_gt = function(a, b) {
        return a > b;
    };
    Long_ge = function(a, b) {
        return a >= b;
    };
    Long_lt = function(a, b) {
        return a < b;
    };
    Long_le = function(a, b) {
        return a <= b;
    };
    Long_add = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a + b);
    };
    Long_inc = function(a) {
        return $rt_globals.BigInt.asIntN(64, a + 1);
    };
    Long_dec = function(a) {
        return $rt_globals.BigInt.asIntN(64, a - 1);
    };
    Long_neg = function(a) {
        return $rt_globals.BigInt.asIntN(64,  -a);
    };
    Long_sub = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a - b);
    };
    Long_compare = function(a, b) {
        return a < b ?  -1 : a > b ? 1 : 0;
    };
    Long_mul = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a * b);
    };
    Long_div = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a / b);
    };
    Long_udiv = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) / $rt_globals.BigInt.asUintN(64, b));
    };
    Long_rem = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a % b);
    };
    Long_urem = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) % $rt_globals.BigInt.asUintN(64, b));
    };
    Long_and = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a & b);
    };
    Long_or = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a | b);
    };
    Long_xor = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a ^ b);
    };
    Long_shl = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a << $rt_globals.BigInt(b & 63));
    };
    Long_shr = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a >> $rt_globals.BigInt(b & 63));
    };
    Long_shru = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) >> $rt_globals.BigInt(b & 63));
    };
    Long_not = function(a) {
        return $rt_globals.BigInt.asIntN(64, ~a);
    };
}
var Long_add = Long_add;

var Long_sub = Long_sub;

var Long_mul = Long_mul;

var Long_div = Long_div;

var Long_rem = Long_rem;

var Long_or = Long_or;

var Long_and = Long_and;

var Long_xor = Long_xor;

var Long_shl = Long_shl;

var Long_shr = Long_shr;

var Long_shru = Long_shru;

var Long_compare = Long_compare;

var Long_eq = Long_eq;

var Long_ne = Long_ne;

var Long_lt = Long_lt;

var Long_le = Long_le;

var Long_gt = Long_gt;

var Long_ge = Long_ge;

var Long_not = Long_not;

var Long_neg = Long_neg;

function $rt_startThread(runner, callback) {
    var result;
    try {
        result = runner();
    } catch (e){
        result = e;
    }
    if (typeof callback !== 'undefined') {
        callback(result);
    } else if (result instanceof $rt_globals.Error) {
        throw result;
    }
}
function $rt_suspending() {
    return false;
}
function $rt_resuming() {
    return false;
}
function $rt_nativeThread() {
    return null;
}
function $rt_invalidPointer() {
}
main = $rt_mainStarter(mq_Client_main);
main.javaException = $rt_javaException;
(function() {
    var c;
    c = mqw_Worker.prototype;
    c.dispatchEvent = c.$dispatchEvent$exported$4;
    c.addEventListener = c.$addEventListener$exported$1;
    c.removeEventListener = c.$removeEventListener$exported$2;
    c.addEventListener = c.$addEventListener$exported$5;
    c.onError = c.$onError$exported$0;
    c.removeEventListener = c.$removeEventListener$exported$3;
    c = mq_Client$main$lambda$_2_0.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = otjb_Window.prototype;
    c.dispatchEvent = c.$dispatchEvent$exported$4;
    c.addEventListener = c.$addEventListener$exported$0;
    c.removeEventListener = c.$removeEventListener$exported$1;
    c.getLength = c.$getLength$exported$5;
    c.get = c.$get$exported$2;
    c.addEventListener = c.$addEventListener$exported$6;
    c.removeEventListener = c.$removeEventListener$exported$3;
})();
})(this);

//# sourceMappingURL=classes.js.map