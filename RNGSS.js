// Dependencies.
import {StyleSheet} from "react-native";

// Attributes and constants.
const AlignContent = new Object ({
    FLEX_START: "flex-start", FLEX_END: "flex-end", CENTER: "center", STRETCH: "stretch", SPACE_BETWEEN: "space-between", SPACE_AROUND: "space-around"
});
const JustifyContent = new Object ({
    FLEX_START: "flex-start", FLEX_END: "flex-end", CENTER: "center", CENTER: "center", SPACE_EVENLY: "space-evenly", SPACE_BETWEEN: "space-between",
    SPACE_AROUND: "space-around"
});
const TextDecoration = new Object ({
    NONE: "none", UNDERLINE: "underline", LINE_THROUGH: "line-through", UNDERLINE_LINE_THROUGH: "underline line-through", SOLID: "solid",
    DOUBLE: "double", DOTTED: "dotted", DASHED: "dashed"
});
const TextVariant = new Object ({
    SMALL_CAPS: "small-caps", OLDSTYLE_NUMS: "oldstyle-nums", LINING_NUMS: "lining-nums", TABULAR_NUMS: "tabular-nums",
    PROPORTIONNAL_NUMS: "proportional-nums", NONE: []
});
const AlignSelf = new Object ({AUTO: "auto", BASELINE: "baseline", FLEX_START: "flex-start", FLEX_END: "flex-end", CENTER: "center", STRETCH: "stretch"});
const AlignItems = new Object ({BASELINE: "baseline", FLEX_START: "flex-start", FLEX_END: "flex-end", CENTER: "center", STRETCH: "stretch"});
const FlexDirection = new Object ({ROW: "row", ROW_REVERSE: "row-reverse", COLUMN: "column", COLUMN_REVERSE: "column-reverse"});
const TextTransform = new Object ({NONE: "none", UPPERCAE: "uppercase", LOWERCASE: "lowercase", CAPITALIZE: "capitalize"});
const Image = new Object ({COVER: "cover", CONTAIN: "contain", STRETCH: "stretch", REPEAT: "repeat", CENTER: "center"});
const TextAlign = new Object ({AUTO: "auto", LEFT: "left", RIGHT: "right", CENTER: "center", JUSTIFY: "justify"});
const TextAlignVertical = new Object ({AUTO: "auto", TOP: "top", BOTTOM: "bottom", CENTER: "center"});
const FlexWrap = new Object ({WRAP: "wrap", NOWRAP: "nowrap", WRAP_REVERSE: "wrap-reverse"});
const Position = new Object ({ABSOLUTE: "absolute", RELATIVE: "relative", AUTO: "auto"});
const BorderStyle = new Object ({SOLID: "solid", DOTTED: "dotted", DASHED: "dashed"});
const TextDirection = new Object ({AUTO: "auto", NORMAL: "ltr", REVERSE: "rtl"});
const Direction = new Object ({INHERIT: "inherit", LTR: "ltr", RTL: "rtl"});
const TextStyle = new Object ({NORMAL: "normal", ITALIC: "italic"});
const TextWeight = new Object ({NORMAL: "normal", BOLD: "bold"});
const Display = new Object ({NONE: "none", FLEX: "flex"});

/*
*   @Description: Binds one or many stylesheet(s) into one stylesheet.
*   @Parameters:
*       -> Object | Array stylesheets: Contains all stylesheet(s) to be bound.
*       -> String | Array properties: Contains all property(ies) name(s) to be returned into the final stylesheet.
*   @Return: Object
*/
function _get_bound_stylesheet (stylesheets, properties) {
    // Corrects the passed stylesheets and property(ies) into an array.
    stylesheets = (!Array.isArray (stylesheets) ? [stylesheets] : stylesheets); properties = (!Array.isArray (properties) ? [properties] : properties);
    // Contains the final stylesheet after bound process and converts all passed stylesheet property(ies) name(s) into lower case.
    let bound_style = new Object ({}); for (let i = 0; i < properties.length; i++) properties [i] = String (properties [i]).replace (/g /, '').toLocaleLowerCase ();
    // Generating bound stylesheet.
    for (let stylesheet of stylesheets) {
        // Getting the current stylesheet property(ies).
        for (let property of Object.keys (stylesheet)) {
            // Shows the given property(ies) into "properties" array whether some property(ies) have/has been passed.
            if (properties.length && properties.indexOf (property.replace (/g /, '').toLocaleLowerCase () > -1)) bound_style [property] = stylesheet [property];
            // Shows all property(ies) for an empty "properties" array.
            else if (!properties.length) bound_style [property] = stylesheet [property];
        }
    // Returns the final result.
    } return bound_style;
}

/*
*   @Description: The given stylesheet property contains an invalid entry ?
*   @Parameters:
*       -> Any value: Contains a property's value.
*   @Return: Boolean
*/
function _is_empty (value) {
    // For a basic value.
    if (value === null || value === undefined || value === NaN || value === '') return true;
    // For a String.
    else if (typeof value === "string") {
        // Removes all spaces.
        value = value.replace (/g /, '').toLocaleLowerCase (); if (value === "undefined" || value === "null" || value === "nan" || value.length <= 0) return true;
    // For an array.
    } else if (Array.isArray (value) && value.length <= 0) return true;
    // For an object.
    else if (!Array.isArray (value) && typeof value === "object" && Object.keys (value).length <= 0) return true;
    // Returns a falsy value for others cases.
    else return false;
}

/*
*   @Description: A basic image stylesheet.
*   @Parameters:
*       -> String mode = Image.CONTAIN: Contains image resize mode.
*       -> int ratio = 1: Contains image aspect ratio.
*   @Return: Object
*/
function _get_basic_image_stylesheet (mode, ratio) {
    // Returns image stylesheet.
    return new Object ({
        aspectRatio: ((!_is_empty (ratio) && typeof ratio === "number") ? parseInt (ratio) : 1),
        resizeMode: ((!_is_empty (mode) && typeof mode === "string") ? mode : Image.CONTAIN)
    });
}

/*
*   @Description: A basic borders stylesheet.
*   @Parameters:
*       -> float width = 1.0: Contains borders width.
*       -> String style = BorderStyle.SOLID: Contains borders style.
*       -> Color color = "#000": Contains borders color.
*       -> float radius = 0.0: Contains borders radius.
*       -> Color end_color = "transparent": Contains borders end color.
*   @Return: Object
*/
function _get_basic_borders_stylesheet (width, style, color, radius, end_color) {
    // Returns borders stylesheet.
    return new Object ({
        borderEndColor: ((!_is_empty (end_color) && typeof end_color === "string") ? end_color : "transparent"),
        borderRadius: ((!_is_empty (radius) && typeof radius === "number") ? parseFloat (radius) : 0.0),
        borderStyle: ((!_is_empty (style) && typeof style === "string") ? style : BorderStyle.SOLID),
        borderWidth: ((!_is_empty (width) && typeof width === "number") ? parseFloat (width) : 1.0),
        borderColor: ((!_is_empty (color) && typeof color === "string") ? color : "#000")
    });
}

/*
*   @Description: A basic border top stylesheet.
*   @Parameters:
*       -> float width = 1.0: Contains border top width.
*       -> Color color = "#000": Contains border top color.
*       -> float left_radius = 0.0: Contains border top left radius.
*       -> float right_radius = 0.0: Contains border top right radius.
*       -> float start_radius = 0.0: Contains border top start radius.
*       -> float end_radius = 0.0: Contains border top end radius.
*   @Return: Object
*/
function _get_basic_border_top_stylesheet (width, color, left_radius, right_radius, start_radius, end_radius) {
    // Returns border top stylesheet.
    return new Object ({
        borderTopStartRadius: ((!_is_empty (start_radius) && typeof start_radius === "number") ? parseFloat (start_radius) : 0.0),
        borderTopRightRadius: ((!_is_empty (right_radius) && typeof right_radius === "number") ? parseFloat (right_radius) : 0.0),
        borderTopLeftRadius: ((!_is_empty (left_radius) && typeof left_radius === "number") ? parseFloat (left_radius) : 0.0),
        borderTopEndRadius: ((!_is_empty (end_radius) && typeof end_radius === "number") ? parseFloat (end_radius) : 0.0),
        borderTopWidth: ((!_is_empty (width) && typeof width === "number") ? parseFloat (width) : 1.0),
        borderTopColor: ((!_is_empty (color) && typeof color === "string") ? color : "#000")
    });
}

/*
*   @Description: A basic border bottom stylesheet.
*   @Parameters:
*       -> float width = 1.0: Contains border bottom width.
*       -> Color color = "#000": Contains border bottom color.
*       -> float left_radius = 0.0: Contains border bottom left radius.
*       -> float right_radius = 0.0: Contains border bottom right radius.
*       -> float start_radius = 0.0: Contains border bottom start radius.
*       -> float end_radius = 0.0: Contains border bottom end radius.
*   @Return: Object
*/
function _get_basic_border_bottom_stylesheet (width, color, left_radius, right_radius, start_radius, end_radius) {
    // Returns border bottom stylesheet.
    return new Object ({
        borderBottomStartRadius: ((!_is_empty (start_radius) && typeof start_radius === "number") ? parseFloat (start_radius) : 0.0),
        borderBottomRightRadius: ((!_is_empty (right_radius) && typeof right_radius === "number") ? parseFloat (right_radius) : 0.0),
        borderBottomLeftRadius: ((!_is_empty (left_radius) && typeof left_radius === "number") ? parseFloat (left_radius) : 0.0),
        borderBottomEndRadius: ((!_is_empty (end_radius) && typeof end_radius === "number") ? parseFloat (end_radius) : 0.0),
        borderBottomWidth: ((!_is_empty (width) && typeof width === "number") ? parseFloat (width) : 1.0),
        borderBottomColor: ((!_is_empty (color) && typeof color === "string") ? color : "#000")
    });
}

/*
*   @Description: A basic border left stylesheet.
*   @Parameters:
*       -> float width = 1.0: Contains border left width.
*       -> Color color = "#000": Contains border left color.
*   @Return: Object
*/
function _get_basic_border_left_stylesheet (width, color) {
    // Returns border left stylesheet.
    return new Object ({
        borderLeftWidth: ((!_is_empty (width) && typeof width === "number") ? parseFloat (width) : 1.0),
        borderLeftColor: ((!_is_empty (color) && typeof color === "string") ? color : "#000")
    });
}

/*
*   @Description: A basic border right stylesheet.
*   @Parameters:
*       -> float width = 1.0: Contains border right width.
*       -> Color color = "#000": Contains border right color.
*   @Return: Object
*/
function _get_basic_border_right_stylesheet (width, color) {
    // Returns border right stylesheet.
    return new Object ({
        borderRightWidth: ((!_is_empty (width) && typeof width === "number") ? parseFloat (width) : 1.0),
        borderRightColor: ((!_is_empty (color) && typeof color === "string") ? color : "#000")
    });
}

/*
*   @Description: A basic flexbox stylesheet.
*   @Parameters:
*       -> float flex = -1.0: Contains element flex state.
*       -> String juscont = JustifyContent.FLEX_START: Contains element flexbox justified content.
*       -> String aligitm = AlignItems.FLEX_START: Contains element flexbox aligned items.
*       -> String aligself = AlignSelf.AUTO: Contains element flexbox aligned self.
*       -> String aligcont = AlignContent.FLEX_START: Content element flexbox aligned content.
*       -> String wrap = FlexWrap.NOWRAP: Content element flexbox wrap state.
*       -> String | float basis = "auto": Content element flexbox basis state.
*       -> float shrink = 0.0: Content element flexbox shrink state.
*       -> float grow = 0.0: Content element flexbox grow state.
*   @Return: Object
*/
function _get_basic_flexbox_stylesheet (flex, juscont, aligitm, aligself, aligcont, wrap, basis, shrink, grow) {
    // Returns flexbox stylesheet.
    return new Object ({
        flexBasis: (!_is_empty (basis) ? (typeof basis === "number" ? parseFloat (basis) : (typeof basis === "string" ? basis : "auto")) : "auto"),
        justifyContent: ((!_is_empty (juscont) && typeof juscont === "string") ? juscont : JustifyContent.FLEX_START),
        alignContent: ((!_is_empty (aligcont) && typeof aligcont === "string") ? aligcont : AlignContent.FLEX_START),
        alignItems: ((!_is_empty (aligitm) && typeof aligitm === "string") ? aligitm : AlignItems.FLEX_START),
        alignSelf: ((!_is_empty (aligself) && typeof aligself === "string") ? aligself : AlignSelf.AUTO),
        flexShrink: ((!_is_empty (shrink) && typeof shrink === "number") ? parseFloat (shrink) : 0.0),
        flexGrow: ((!_is_empty (grow) && typeof grow === "number") ? parseFloat (grow) : 0.0),
        flexWrap: ((!_is_empty (wrap) && typeof wrap === "string") ? wrap : FlexWrap.NOWRAP),
        flex: ((!_is_empty (flex) && typeof flex === "number") ? parseFloat (flex) : -1.0)
    });
}

/*
*   @Description: A basic margins stylesheet.
*   @Parameters:
*       -> String | float top = 0.0: Contains element top margin.
*       -> String | float right = 0.0: Contains element right margin.
*       -> String | float bottom = 0.0: Contains element bottom margin.
*       -> String | float left = 0.0: Contains element left margin.
*       -> String | float start = 0.0: Contains element start margin.
*       -> String | float end = 0.0: Contains element end margin.
*       -> String | float horz = 0.0: Contains element horizontal margin.
*       -> String | float vertical = 0.0: Contains element vertical margin.
*   @Return: Object
*/
function _get_basic_margins_stylesheet (top, right, bottom, left, start, end, horz, vertical) {
    // Returns margins stylesheet.
    return new Object ({
        marginVertical: (!_is_empty (vertical) ? (typeof vertical === "number" ? parseFloat (vertical) : (typeof vertical === "string" ? vertical : 0.0)) : 0.0),
        marginBottom: (!_is_empty (bottom) ? (typeof bottom === "number" ? parseFloat (bottom) : (typeof bottom === "string" ? bottom : 0.0)) : 0.0),
        marginHorizontal: (!_is_empty (horz) ? (typeof horz === "number" ? parseFloat (horz) : (typeof horz === "string" ? horz : 0.0)) : 0.0),
        marginRight: (!_is_empty (right) ? (typeof right === "number" ? parseFloat (right) : (typeof right === "string" ? right : 0.0)) : 0.0),
        marginStart: (!_is_empty (start) ? (typeof start === "number" ? parseFloat (start) : (typeof start === "string" ? start : 0.0)) : 0.0),
        marginLeft: (!_is_empty (left) ? (typeof left === "number" ? parseFloat (left) : (typeof left === "string" ? left : 0.0)) : 0.0),
        marginTop: (!_is_empty (top) ? (typeof top === "number" ? parseFloat (top) : (typeof top === "string" ? top : 0.0)) : 0.0),
        marginEnd: (!_is_empty (end) ? (typeof end === "number" ? parseFloat (end) : (typeof end === "string" ? end : 0.0)) : 0.0)
    });
}

/*
*   @Description: A basic paddings stylesheet.
*   @Parameters:
*       -> String | float top = 0.0: Contains element top padding.
*       -> String | float right = 0.0: Contains element right padding.
*       -> String | float bottom = 0.0: Contains element bottom padding.
*       -> String | float left = 0.0: Contains element left padding.
*       -> String | float start = 0.0: Contains element start padding.
*       -> String | float end = 0.0: Contains element end padding.
*       -> String | float horz = 0.0: Contains element horizontal padding.
*       -> String | float vertical = 0.0: Contains element vertical padding.
*   @Return: Object
*/
function _get_basic_paddings_stylesheet (top, right, bottom, left, start, end, horz, vertical) {
    // Returns paddings stylesheet.
    return new Object ({
        paddingVertical: (!_is_empty (vertical) ? (typeof vertical === "number" ? parseFloat (vertical) : (typeof vertical === "string" ? vertical : 0.0)) : 0.0),
        paddingBottom: (!_is_empty (bottom) ? (typeof bottom === "number" ? parseFloat (bottom) : (typeof bottom === "string" ? bottom : 0.0)) : 0.0),
        paddingRight: (!_is_empty (right) ? (typeof right === "number" ? parseFloat (right) : (typeof right === "string" ? right : 0.0)) : 0.0),
        paddingStart: (!_is_empty (start) ? (typeof start === "number" ? parseFloat (start) : (typeof start === "string" ? start : 0.0)) : 0.0),
        paddingHorizontal: (!_is_empty (horz) ? (typeof horz === "number" ? parseFloat (horz) : (typeof horz === "string" ? horz : 0.0)) : 0.0),
        paddingLeft: (!_is_empty (left) ? (typeof left === "number" ? parseFloat (left) : (typeof left === "string" ? left : 0.0)) : 0.0),
        paddingTop: (!_is_empty (top) ? (typeof top === "number" ? parseFloat (top) : (typeof top === "string" ? top : 0.0)) : 0.0),
        paddingEnd: (!_is_empty (end) ? (typeof end === "number" ? parseFloat (end) : (typeof end === "string" ? end : 0.0)) : 0.0)
    });
}

/*
*   @Description: A basic position layout stylesheet.
*   @Parameters:
*       -> String position = Position.AUTO: Contains element position.
*       -> String | float top = "auto": Contains element top position.
*       -> String | float right = "auto": Contains element right position.
*       -> String | float bottom = "auto": Contains element bottom position.
*       -> String | float left = "auto": Contains element left position.
*       -> int zindex = 0: Contains element zindex position.
*       -> String | float start = "auto": Contains element start position.
*       -> String | float end = "auto": Contains element end position.
*   @Return: Object
*/
function _get_basic_position_stylesheet (position, top, right, bottom, left, zindex, start, end) {
    // Returns position stylesheet.
    return new Object ({
        bottom: (!_is_empty (bottom) ? (typeof bottom === "number" ? parseFloat (bottom) : (typeof bottom === "string" ? bottom : "auto")) : "auto"),
        right: (!_is_empty (right) ? (typeof right === "number" ? parseFloat (right) : (typeof right === "string" ? right : "auto")) : "auto"),
        start: (!_is_empty (start) ? (typeof start === "number" ? parseFloat (start) : (typeof start === "string" ? start : "auto")) : "auto"),
        left: (!_is_empty (left) ? (typeof left === "number" ? parseFloat (left) : (typeof left === "string" ? left : "auto")) : "auto"),
        top: (!_is_empty (top) ? (typeof top === "number" ? parseFloat (top) : (typeof top === "string" ? top : "auto")) : "auto"),
        end: (!_is_empty (end) ? (typeof end === "number" ? parseFloat (end) : (typeof end === "string" ? end : "auto")) : "auto"),
        position: ((typeof position === "string" && !_is_empty (position)) ? position : Position.AUTO),
        zIndex: ((typeof zindex === "number" && !_is_empty (zindex)) ? parseInt (zindex) : 0)
    });
}

/*
*   @Description: A basic dimensions stylesheet.
*   @Parameters:
*       -> String | float width = "auto": Contains element width.
*       -> String | float height = "auto": Contains element height.
*       -> String | float minwidth = "auto": Contains element min width.
*       -> String | float maxwidth = "auto": Contains element max width.
*       -> String | float minheight = "auto": Contains element min height.
*       -> String | float maxheight = "auto": Contains element max height.
*   @Return: Object
*/
function _get_basic_dimensions_stylesheet (width, height, minwidth, maxwidth, minheight, maxheight) {
    // Returns dimensions stylesheet.
    return new Object ({
        minHeight: (!_is_empty (minheight) ? (typeof minheight === "number" ? parseFloat (minheight) : (typeof minheight === "string" ? minheight : "auto")) : "auto"),
        maxHeight: (!_is_empty (maxheight) ? (typeof maxheight === "number" ? parseFloat (maxheight) : (typeof maxheight === "string" ? maxheight : "auto")) : "auto"),
        maxWidth: (!_is_empty (maxwidth) ? (typeof maxwidth === "number" ? parseFloat (maxwidth) : (typeof maxwidth === "string" ? maxwidth : "auto")) : "auto"),
        minWidth: (!_is_empty (minwidth) ? (typeof minwidth === "number" ? parseFloat (minwidth) : (typeof minwidth === "string" ? minwidth : "auto")) : "auto"),
        height: (!_is_empty (height) ? (typeof height === "number" ? parseFloat (height) : (typeof height === "string" ? height : "auto")) : "auto"),
        width: (!_is_empty (width) ? (typeof width === "number" ? parseFloat (width) : (typeof width === "string" ? width : "auto")) : "auto")
    });
}

/*
*   @Description: A basic stylesheet effect.
*   @Parameters:
*       -> String bgcolor = "transparent": Contains element background color.
*       -> float opacity = 1.0: Contains element opacity.
*       -> int elevation = 0: Contains element elevation.
*       -> String display = Display.FLEX: Contains element display mode.
*       -> String dir = Direction.INHERIT: Contains element direction. (Only on ios).
*       -> Boolean overflow = true: Contains element overflow.
*       -> Boolean bfv = true: Contains element backface visibility.
*       -> Color tintColor = "transparent": Contains element color tint.
*       -> Color overlayColor = "transparent": Contains element overlay color. (Only on Android).
*       -> Color shcolor = "#000": Contains element shadow color. (Only on ios).
*       -> float shopacity = 1.0: Contains element shadow opacity. (Only on ios).
*       -> Object shoffset = new Object ({width: 0.0, height: 0.0}): Contains element shadow offset. (Only on ios).
*       -> float shradius = 1.0: Contains element shadow radius. (Only on ios).
*   @Return: Object
*/
function _get_basic_effect_stylesheet (bgcolor, opacity, elevation, overflow, display, dir, bfv, tintColor, overlayColor, shcolor, shopacity, shoffset, shradius) {
    // Corrects shadow offset value.
    if (!Array.isArray (shoffset) && typeof shoffset === "object") {
        // Corrects the passed height.
        shoffset.height = ((shoffset.hasOwnProperty ("height") && typeof shoffset.height === "number") ? parseFloat (shoffset.height) : 0.0);
        // Corrects the passed width.
        shoffset.width = ((shoffset.hasOwnProperty ("width") && typeof shoffset.width === "number") ? parseFloat (shoffset.width) : 0.0);
    // Otherwise. Then, returns effect stylesheet.
    } else shoffset = new Object ({width: 0.0, height: 0.0}); return new Object ({
        overflow: ((!_is_empty (overflow) && typeof overflow === "boolean") ? (overflow ? "visible" : "hidden") : "visible"),
        backfaceVisibility: ((!_is_empty (bfv) && typeof bfv === "boolean") ? (bfv ? "visible" : "hidden") : "visible"),
        overlayColor: ((!_is_empty (overlayColor) && typeof overlayColor === "string") ? overlayColor : "transparent"),
        shadowOpacity: ((!_is_empty (shopacity) && typeof shopacity === "number") ? parseFloat (shopacity) : 1.0),
        shadowRadius: ((!_is_empty (shradius) && typeof shradius === "number") ? parseInt (shradius) : 1.0),
        backgroundColor: ((!_is_empty (bgcolor) && typeof bgcolor === "string") ? bgcolor : "transparent"),
        tintColor: ((!_is_empty (tintColor) && typeof tintColor === "string") ? tintColor : "transparent"),
        elevation: ((!_is_empty (elevation) && typeof elevation === "number") ? parseInt (elevation) : 0),
        opacity: ((!_is_empty (opacity) && typeof opacity === "number") ? parseFloat (opacity) : 1.0),
        display: ((!_is_empty (display) && typeof display === "string") ? display : Display.FLEX),
        shadowColor: ((!_is_empty (shcolor) && typeof shcolor === "string") ? shcolor : "#000"),
        direction: ((!_is_empty (dir) && typeof dir === "string") ? dir : Direction.INHERIT),
        shadowOffset: shoffset
    });
}

/*
 *  @Description: A basic text stylesheet.
 *  @Parameters:
 *      -> float size = 16.0: Contains text font size.
 *      -> Color color = "#000": Contains text color.
 *      -> float spacing = 1.5: Contains text letter spacing.
 *      -> String align = TextAlign.AUTO: Contains text align.
 *      -> String transf = TextTransform.NONE: Contains text transform.
 *      -> String weight = TextWeight.NORMAL: Contains text weight.
 *      -> String family = "normal": Contains text family.
 *      -> String style = TextStyle.NORMAL: Contains text style.
 *      -> float line = 0.0: Contains text line height.
 *      -> String | Array variant = []: Contains text variant.
 *      -> String dir = TextDirection.AUTO: Contains text writing direction. (Only for ios).
 *      -> Color tsc = "#000": Contains text shadow color.
 *      -> Object tso = new Object ({width: 0.0, height: 0.0}): Contains text shadow offset.
 *      -> float tsr = 0.0: Contains text shadow radius.
 *      -> Color tdc = "#000": Contains text decoration color. (Only for ios).
 *      -> String tdl = TextDecoration.NONE: Contains text decoration line.
 *      -> String tds = TextDecoration.SOLID: Contains text decoration style. (Only for ios).
 *      -> Boolean ifp = true: Contains text font padding inclusion. (Only for Android).
 *      -> String tav = TextAlignVertical.AUTO: Contains text align vertical state.
 *  @Return: Object
 */
function _get_basic_text_stylesheet (size, color, spacing, align, transf, weight, family, style, line, variant, dir, tsc, tso, tsr, tdc, tdl, tds, ifp, tav) {
    // Corrects shadow offset value.
    if (!Array.isArray (tso) && typeof tso === "object") {
        // Corrects the passed height.
        tso.height = ((tso.hasOwnProperty ("height") && typeof tso.height === "number") ? parseFloat (tso.height) : 0.0);
        // Corrects the passed width.
        tso.width = ((tso.hasOwnProperty ("width") && typeof tso.width === "number") ? parseFloat (tso.width) : 0.0);
    // Otherwise. Then, returns text label stylesheet.
    } else tso = new Object ({width: 0.0, height: 0.0}); return new Object ({
        fontVariant: (!_is_empty (variant) ? (typeof variant === "string" ? [variant] : Array.isArray (variant) ? variant : TextVariant.NONE) : TextVariant.NONE),
        letterSpacing: ((!_is_empty (spacing) && typeof spacing === "number") ? parseFloat (spacing) : 1.5),
        textTransform: ((!_is_empty (transf) && typeof transf === "string") ? transf : TextTransform.NONE),
        textDecorationStyle: ((!_is_empty (tds) && typeof tds === "string") ? tds : TextDecoration.SOLID),
        textAlignVertical: ((!_is_empty (tav) && typeof tav === "string") ? tav : TextAlignVertical.AUTO),
        textDecorationLine: ((!_is_empty (tdl) && typeof tdl === "string") ? tdl : TextDecoration.NONE),
        fontWeight: ((!_is_empty (weight) && typeof weight === "string") ? weight : TextWeight.NORMAL),
        writingDirection: ((!_is_empty (dir) && typeof dir === "string") ? dir : TextDirection.AUTO),
        textShadowRadius: ((!_is_empty (tsr) && typeof tsr === "number") ? parseFloat (tsr) : 0.0),
        fontStyle: ((!_is_empty (style) && typeof style === "string") ? style : TextStyle.NORMAL),
        lineHeight: ((!_is_empty (line) && typeof line === "number") ? parseFloat (line) : 0.0),
        textAlign: ((!_is_empty (align) && typeof align === "string") ? align : TextAlign.AUTO),
        fontSize: ((!_is_empty (size) && typeof size === "number") ? parseFloat (size) : 16.0),
        fontFamily: ((!_is_empty (family) && typeof family === "string") ? family : "normal"),
        textDecorationColor: ((!_is_empty (tdc) && typeof tdc === "string") ? tdc : "#000"),
        includeFontPadding: ((!_is_empty (ifp) && typeof ifp === "boolean") ? ifp : true),
        textShadowColor: ((!_is_empty (tsc) && typeof tsc === "string") ? tsc : "#000"),
        color: ((!_is_empty (color) && typeof color === "string") ? color : "#000"),
        textShadowOffset: tso
    });
}

// Generic stylesheets exportation.
export default StyleSheet.create (new Object ({
    // Constants exportations.
    TextAlignVertical: TextAlignVertical,
    TextDecoration: TextDecoration,
    JustifyContent: JustifyContent,
    TextTransform: TextTransform,
    TextDirection: TextDirection,
    FlexDirection: FlexDirection,
    AlignContent: AlignContent,
    TextVariant: TextVariant,
    BorderStyle: BorderStyle,
    TextWeight: TextWeight,
    AlignItems: AlignItems,
    TextStyle: TextStyle,
    TextAlign: TextAlign,
    Direction: Direction,
    AlignSelf: AlignSelf,
    Position: Position,
    FlexWrap: FlexWrap,
    Display: Display,
    Image: Image,
    // Fonctions or methods exportations.
    border_bottom: _get_basic_border_bottom_stylesheet,
    border_right: _get_basic_border_right_stylesheet,
    border_left: _get_basic_border_left_stylesheet,
    border_top: _get_basic_border_top_stylesheet,
    resize: _get_basic_dimensions_stylesheet,
    position: _get_basic_position_stylesheet,
    padding: _get_basic_paddings_stylesheet,
    flexbox: _get_basic_flexbox_stylesheet,
    margin: _get_basic_margins_stylesheet,
    border: _get_basic_borders_stylesheet,
    effect: _get_basic_effect_stylesheet,
    image: _get_basic_image_stylesheet,
    text: _get_basic_text_stylesheet,
    bind: _get_bound_stylesheet,
    empty: _is_empty
}));
