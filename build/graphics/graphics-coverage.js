if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/graphics/graphics.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/graphics/graphics.js",
    code: []
};
_yuitest_coverage["/build/graphics/graphics.js"].code=["YUI.add('graphics', function(Y) {","","/**"," * "," * <p>The `Graphics` module provides a JavaScript API for creating shapes in a variety of formats across "," * a <a href=\"http://developer.yahoo.com/yui/articles/gbs\">browser test baseline</a>. "," * Based on device and browser capabilities, `Graphics` leverages <a href=\"http://www.w3.org/TR/SVG/\">SVG</a>, "," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> and <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> "," * to render its graphical elements.</p>"," *"," * <p>The `Graphics` module features a <a href=\"../classes/Graphic.html\">`Graphic`</a> class that allows you to easily create and manage shapes. "," * Currently, a <a href=\"../classes/Graphic.html\">`Graphic`</a> instance can be used to create predifined shapes and free-form polygons with fill "," * and stroke properties.</p>  "," *"," * <p>The `Graphics` module normalizes an API through the use of alias and implementation classes that share"," * interfaces. Each alias class points to an appropriate implementation class dependent on the browser's "," * capabilities. There should rarely, if ever, be a need to interact directly with an implementation class.</p>"," *"," * <p>Below is a list of available classes. "," *     <ul>"," *         <li><a href=\"../classes/Graphic.html\">`Graphic`</a>"," *         <li><a href=\"../classes/Shape.html\">`Shape`</a>"," *         <li><a href=\"../classes/Circle.html\">`Circle`</a>"," *         <li><a href=\"../classes/Ellipse.html\">`Ellipse`</a>"," *         <li><a href=\"../classes/Rect.html\">`Rect`</a>"," *         <li><a href=\"../classes/Path.html\">`Path`</a>"," *     </ul>"," * You can also extend the `Shape` class to create your own custom shape classes.</p>"," * @module graphics"," * @main graphics"," */","var SETTER = \"setter\",","	PluginHost = Y.Plugin.Host,","    VALUE = \"value\",","    VALUEFN = \"valueFn\",","    READONLY = \"readOnly\",","    Y_LANG = Y.Lang,","    STR = \"string\",","    WRITE_ONCE = \"writeOnce\",","    GraphicBase,","    AttributeLite;","    ","    /**","	 * AttributeLite provides Attribute-like getters and setters for shape classes in the Graphics module. It provides a get/set API without the event infastructure.","     * This class is temporary and a work in progress.","	 *","	 * @class AttributeLite","	 * @constructor","	 */","    AttributeLite = function()","    {","        var host = this; // help compression","        ","        // Perf tweak - avoid creating event literals if not required.","        host._ATTR_E_FACADE = {};","        ","        Y.EventTarget.call(this, {emitFacade:true});","        host._state = {};","        host.prototype = Y.mix(AttributeLite.prototype, host.prototype);","    };","","    AttributeLite.prototype = {","		/**","		 * Initializes the attributes for a shape. If an attribute config is passed into the constructor of the host, ","		 * the initial values will be overwritten.","		 *","		 * @method addAttrs","		 * @param {Object} cfg Optional object containing attributes key value pairs to be set.","		 */","		addAttrs: function(cfg)","		{","			var host = this,","				attrConfig = this.constructor.ATTRS, ","				attr,","				i,","				fn,","				state = host._state;","			for(i in attrConfig)","			{","				if(attrConfig.hasOwnProperty(i))","				{","					attr = attrConfig[i];","					if(attr.hasOwnProperty(VALUE))","					{","						state[i] = attr.value;","					}","					else if(attr.hasOwnProperty(VALUEFN))","					{","						fn = attr.valueFn;","						if(Y_LANG.isString(fn))","						{","							state[i] = host[fn].apply(host);","						}","						else","						{","							state[i] = fn.apply(host);","						}","					}","			    }","            }","			host._state = state;","            for(i in attrConfig)","			{","				if(attrConfig.hasOwnProperty(i))","				{","					attr = attrConfig[i];","                    if(attr.hasOwnProperty(READONLY) && attr.readOnly)","					{","						continue;","					}","","					if(attr.hasOwnProperty(WRITE_ONCE) && attr.writeOnce)","					{","						attr.readOnly = true;","					}","","					if(cfg && cfg.hasOwnProperty(i))","					{","						if(attr.hasOwnProperty(SETTER))","						{","							host._state[i] = attr.setter.apply(host, [cfg[i]]);","						}","						else","						{","							host._state[i] = cfg[i];","						}","					}","				}","			}","		},","","        /**","         * For a given item, returns the value of the property requested, or undefined if not found.","         *","         * @method get","         * @param name {String} The name of the item","         * @return {Any} The value of the supplied property.","         */","        get: function(attr)","        {","            var host = this,","                getter,","                attrConfig = host.constructor.ATTRS;","            if(attrConfig && attrConfig[attr])","            {","                getter = attrConfig[attr].getter;","                if(getter)","                {","                    if(typeof getter == STR)","                    {","                        return host[getter].apply(host);","                    }","                    return attrConfig[attr].getter.apply(host);","                }","","                return host._state[attr];","            }","            return null;","        },","    ","        /**","         * Sets the value of an attribute.","         *","         * @method set","         * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can ","         * be passed in to set multiple attributes at once.","         * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as ","         * the name param.","         */","        set: function(attr, val)","        {","            var i;","            if(Y_LANG.isObject(attr))","            {","                for(i in attr)","                {","                    if(attr.hasOwnProperty(i))","                    {","                        this._set(i, attr[i]);","                    }","                }","            }","            else","            {","                this._set.apply(this, arguments);","            }","        },","","		/**","         * Provides setter logic. Used by `set`.","         *","         * @method _set","         * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can ","         * be passed in to set multiple attributes at once.","         * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as ","         * the name param.","		 * @protected","		 */","		_set: function(attr, val)","		{","			var host = this,","				setter,","				args,","				attrConfig = host.constructor.ATTRS;","			if(attrConfig && attrConfig.hasOwnProperty(attr))","			{","				setter = attrConfig[attr].setter;","				if(setter)","				{","					args = [val];","					if(typeof setter == STR)","					{","						val = host[setter].apply(host, args);","					}","					else","                    {","					    val = attrConfig[attr].setter.apply(host, args);","                    }","				}","				host._state[attr] = val;","			}","		}","	};","    Y.mix(AttributeLite, Y.EventTarget, false, null, 1);","	Y.AttributeLite = AttributeLite;","","    /**","     * GraphicBase serves as the base class for the graphic layer. It serves the same purpose as","     * Base but uses a lightweight getter/setter class instead of Attribute.","     * This class is temporary and a work in progress.","     *","     * @class GraphicBase","     * @constructor","     * @param {Object} cfg Key value pairs for attributes","     */","    GraphicBase = function(cfg)","    {","        var host = this,","            PluginHost = Y.Plugin && Y.Plugin.Host;  ","        if (host._initPlugins && PluginHost) {","            PluginHost.call(host);","        }","        ","        host.name = host.constructor.NAME;","        host._eventPrefix = host.constructor.EVENT_PREFIX || host.constructor.NAME;","        AttributeLite.call(host);","        host.addAttrs(cfg);","        host.init.apply(this, arguments);","        if (host._initPlugins) {","            // Need to initPlugins manually, to handle constructor parsing, static Plug parsing","            host._initPlugins(cfg);","        }","        host.initialized = true;","    };","","    GraphicBase.NAME = \"baseGraphic\";","","    GraphicBase.prototype = {","        /**","         * Init method, invoked during construction.","         * Fires an init event after calling `initializer` on implementers.","         *","         * @method init","         * @protected ","         */","        init: function()","        {","            this.publish(\"init\", {","                fireOnce:true","            });","            this.initializer.apply(this, arguments);","            this.fire(\"init\", {cfg: arguments[0]});","        }","    };","//Straightup augment, no wrapper functions","Y.mix(GraphicBase, Y.AttributeLite, false, null, 1);","Y.mix(GraphicBase, PluginHost, false, null, 1);","GraphicBase.prototype.constructor = GraphicBase;","GraphicBase.plug = PluginHost.plug;","GraphicBase.unplug = PluginHost.unplug;","Y.GraphicBase = GraphicBase;","","","/**"," * `Drawing` provides a set of drawing methods used by `Path` and custom shape classes. "," * `Drawing` has the following implementations based on browser capability."," *  <ul>"," *      <li><a href=\"SVGDrawing.html\">`SVGDrawing`</a></li>"," *      <li><a href=\"VMLDrawing.html\">`VMLDrawing`</a></li>"," *      <li><a href=\"CanvasDrawing.html\">`CanvasDrawing`</a></li>"," *  </ul>"," *"," * @class Drawing"," * @constructor"," */","    /**","     * Draws a line segment using the current line style from the current drawing position to the specified x and y coordinates.","     * ","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     */","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     */","    /**","     * Draws a rectangle with rounded corners.","     * ","     * @method drawRoundRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     */","    /**","     * Completes a drawing operation. ","     *","     * @method end","     */","    /**","     * Clears the path.","     *","     * @method clear","     */","/**"," *  <p>Base class for creating shapes.</p>"," *  <p>`Shape` is an abstract class and is not meant to be used directly. The following classes extend"," *  `Shape`."," *"," *  <ul>"," *      <li><a href=\"Circle.html\">`Circle`</a></li>"," *      <li><a href=\"Ellipse.html\">`Ellipse`</a></li>"," *      <li><a href=\"Rect.html\">`Rect`</a></li>"," *      <li><a href=\"Path.html\">`Path`</a></li>"," *  </ul>"," *"," * `Shape` can also be extended to create custom shape classes.</p>"," *"," * `Shape` has the following implementations based on browser capability."," *  <ul>"," *      <li><a href=\"SVGShape.html\">`SVGShape`</a></li>"," *      <li><a href=\"VMLShape.html\">`VMLShape`</a></li>"," *      <li><a href=\"CanvasShape.html\">`CanvasShape`</a></li>"," *  </ul>"," *"," * It is not necessary to interact with these classes directly. `Shape` will point to the appropriate implemention.</p>"," *"," * @class Shape"," * @constructor"," * @param {Object} cfg (optional) Attribute configs"," */","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method initializer","	 */","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute ","	 */","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains x & y values for new position (coordinates are page-based)","	 */","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy. ","	 *","	 * @method contains","	 * @param {Shape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can ","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as ","     * the name param.","     */","	/**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to transate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	/**","	 * Translates the shape along the y-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox. ","     *","	 * @method getBounds","	 * @return Object","	 */","    /**","     * Destroys the instance.","     *","     * @method destroy","     */","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a ","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *     ","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains corresponding methods for each transform","     * that will apply the transform to the current matrix. The below code illustrates how you might use the `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","    ","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String  ","	 */","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	/**","	 * Indicates the height of the shape","	 * ","	 * @config height","	 * @type Number","	 */","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	/**","	 * Contains information about the fill of the shape. ","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1. Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd> ","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape` classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape` classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *  </dl>","	 *","	 * @config fill","	 * @type Object ","	 */","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set to an array, the first index indicates the","     *  length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin of miter, you simply specify the limit as opposed to having","     *  separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	/**","	 * Dom node for the shape.","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	/**","	 * Reference to the parent graphic instance","	 *","	 * @config graphic","	 * @type Graphic","	 * @readOnly","	 */","","/**"," * <p>Creates circle shape with editable attributes.</p> "," * <p>`Circle` instances can be created using the <a href=\"Graphic.html#method_addShape\">`addShape`</a> method of the <a href=\"Graphic.html\">`Graphic`</a> class. "," * The method's `cfg` argument contains a `type` attribute. Assigning \"circle\" or `Y.Circle` to this attribute will create a `Circle` instance. Required attributes"," * for instantiating a `Circle` are `type` and `radius`. Optional attributes include:"," *  <ul>"," *      <li><a href=\"#attr_fill\">fill</a></li>"," *      <li><a href=\"#attr_id\">id</a></li>"," *      <li><a href=\"#attr_stroke\">stroke</a></li>"," *      <li><a href=\"#attr_transform\">transform</a></li>"," *      <li><a href=\"#attr_transformOrigin\">transformOrigin</a></li>"," *      <li><a href=\"#attr_visible\">visible</a></li>"," *      <li><a href=\"#attr_x\">x</a></li>"," *      <li><a href=\"#attr_y\">y</a></li>"," *  </ul>"," * "," * The below code creates a circle by defining the `type` attribute as \"circle\":</p>","","        var myCircle = myGraphic.addShape({","            type: \"circle\",","            radius: 10,","            fill: {","                color: \"#9aa\"","            },","            stroke: {","                weight: 1,","                color: \"#000\"","            }","        });",""," * Below, this same circle is created by defining the `type` attribute with a class reference:"," *","        var myCircle = myGraphic.addShape({","            type: Y.Circle,","            radius: 10,","            fill: {","                color: \"#9aa\"","            },","            stroke: {","                weight: 1,","                color: \"#000\"","            }","        });"," * "," * <p>`Circle` has the following implementations based on browser capability."," *  <ul>"," *      <li><a href=\"SVGCircle.html\">`SVGCircle`</a></li>"," *      <li><a href=\"VMLCircle.html\">`VMLCircle`</a></li>"," *      <li><a href=\"CanvasCircle.html\">`CanvasCircle`</a></li>"," *  </ul>"," *"," * It is not necessary to interact with these classes directly. `Circle` will point to the appropriate implemention.</p>"," *"," * @class Circle"," * @extends Shape"," * @constructor"," */","    /**","     * Radius of the circle","     *","     * @config radius","     * @type Number","     */","/**"," * <p>Creates an ellipse shape with editable attributes.</p>"," * <p>`Ellipse` instances can be created using the <a href=\"Graphic.html#method_addShape\">`addShape`</a> method of the <a href=\"Graphic.html\">`Graphic`</a> class. "," * The method's `cfg` argument contains a `type` attribute. Assigning \"ellipse\" or `Y.Ellipse` to this attribute will create a `Ellipse` instance. Required attributes"," * for instantiating a `Ellipse` are `type`, `width` and `height`. Optional attributes include:"," *  <ul>"," *      <li><a href=\"#attr_fill\">fill</a></li>"," *      <li><a href=\"#attr_id\">id</a></li>"," *      <li><a href=\"#attr_stroke\">stroke</a></li>"," *      <li><a href=\"#attr_transform\">transform</a></li>"," *      <li><a href=\"#attr_transformOrigin\">transformOrigin</a></li>"," *      <li><a href=\"#attr_visible\">visible</a></li>"," *      <li><a href=\"#attr_x\">x</a></li>"," *      <li><a href=\"#attr_y\">y</a></li>"," *  </ul>"," * "," * The below code creates an ellipse by defining the `type` attribute as \"ellipse\":</p>","","        var myEllipse = myGraphic.addShape({","            type: \"ellipse\",","            width: 20,","            height: 10,","            fill: {","                color: \"#9aa\"","            },","            stroke: {","                weight: 1,","                color: \"#000\"","            }","        });",""," * Below, the same ellipse is created by defining the `type` attribute with a class reference:"," *","        var myEllipse = myGraphic.addShape({","            type: Y.Ellipse,","            width: 20,","            height: 10,","            fill: {","                color: \"#9aa\"","            },","            stroke: {","                weight: 1,","                color: \"#000\"","            }","        });"," * "," * <p>`Ellipse` has the following implementations based on browser capability."," *  <ul>"," *      <li><a href=\"SVGEllipse.html\">`SVGEllipse`</a></li>"," *      <li><a href=\"VMLEllipse.html\">`VMLEllipse`</a></li>"," *      <li><a href=\"CanvasEllipse.html\">`CanvasEllipse`</a></li>"," *  </ul>"," *"," * It is not necessary to interact with these classes directly. `Ellipse` will point to the appropriate implemention.</p>"," *"," * @class Ellipse"," * @extends Shape"," * @constructor"," */","/**"," * <p>Creates an rectangle shape with editable attributes.</p>"," * <p>`Rect` instances can be created using the <a href=\"Graphic.html#method_addShape\">`addShape`</a> method of the <a href=\"Graphic.html\">`Graphic`</a> "," * class. The method's `cfg` argument contains a `type` attribute. Assigning \"rect\" or `Y.Rect` to this attribute will create a `Rect` instance. "," * Required attributes for instantiating a `Rect` are `type`, `width` and `height`. Optional attributes include:"," *  <ul>"," *      <li><a href=\"#attr_fill\">fill</a></li>"," *      <li><a href=\"#attr_id\">id</a></li>"," *      <li><a href=\"#attr_stroke\">stroke</a></li>"," *      <li><a href=\"#attr_transform\">transform</a></li>"," *      <li><a href=\"#attr_transformOrigin\">transformOrigin</a></li>"," *      <li><a href=\"#attr_visible\">visible</a></li>"," *      <li><a href=\"#attr_x\">x</a></li>"," *      <li><a href=\"#attr_y\">y</a></li>"," *  </ul>"," *"," * The below code creates a rectangle by defining the `type` attribute as \"rect\":</p>","","        var myRect = myGraphic.addShape({","            type: \"rect\",","            width: 20,","            height: 10,","            fill: {","                color: \"#9aa\"","            },","            stroke: {","                weight: 1,","                color: \"#000\"","            }","        });",""," * Below, the same rectangle is created by defining the `type` attribute with a class reference:"," *","        var myRect = myGraphic.addShape({","            type: Y.Rect,","            width: 20,","            height: 10,","            fill: {","                color: \"#9aa\"","            },","            stroke: {","                weight: 1,","                color: \"#000\"","            }","        });"," *"," * <p>`Rect` has the following implementations based on browser capability."," *  <ul>"," *      <li><a href=\"SVGRect.html\">`SVGRect`</a></li>"," *      <li><a href=\"VMLRect.html\">`VMLRect`</a></li>"," *      <li><a href=\"CanvasRect.html\">`CanvasRect`</a></li>"," *  </ul>"," *"," * It is not necessary to interact with these classes directly. `Rect` will point to the appropriate implemention.</p>"," *"," * @class Rect"," * @extends Shape"," * @constructor"," */","/**"," * <p>The `Path` class creates a shape through the use of drawing methods. The `Path` class has the following drawing methods available:</p>"," *  <ul>"," *      <li><a href=\"#method_clear\">`clear`</a></li>"," *      <li><a href=\"#method_curveTo\">`curveTo`</a></li>"," *      <li><a href=\"#method_drawRect\">`drawRect`</a></li>"," *      <li><a href=\"#method_drawRoundRect\">`drawRoundRect`</a></li>"," *      <li><a href=\"#method_end\">`end`</a></li>"," *      <li><a href=\"#method_lineTo\">`lineTo`</a></li>"," *      <li><a href=\"#method_moveTo\">`moveTo`</a></li>"," *      <li><a href=\"#method_quadraticCurveTo\">`quadraticCurveTo`</a></li>"," *  </ul>"," *"," *  <p>Like other shapes, `Path` elements are created using the <a href=\"Graphic.html#method_addShape\">`addShape`</a> method of the <a href=\"Graphic.html\">`Graphic`</a> "," *  class. The method's `cfg` argument contains a `type` attribute. Assigning \"path\" or `Y.Path` to this attribute will create a `Path` instance."," *  After instantiation, a series of drawing operations must be performed in order to render a shape. The below code instantiates a path element by defining the `type` "," *  attribute as \"path\":</p>","","        var myPath = myGraphic.addShape({","            type: \"path\",","            fill: {","                color: \"#9aa\"","            },","            stroke: {","                weight: 1,","                color: \"#000\"","            }","        });",""," * Below a `Path` element with the same properties is instantiated by defining the `type` attribute with a class reference:"," *","        var myPath = myGraphic.addShape({","            type: Y.Path,","            fill: {","                color: \"#9aa\"","            },","            stroke: {","                weight: 1,","                color: \"#000\"","            }","        });",""," * After instantiation, a shape or segment needs to be drawn for an element to render. After all draw operations are performed, the <a href=\"#method_end\">`end`</a>"," * method will render the shape. The code below will draw a triangle:"," ","        myPath.moveTo(35, 5);","        myPath.lineTo(65, 65);","        myPath.lineTo(5, 65);","        myPath.lineTo(35, 5);","        myPath.end();"," *"," * <p>`Path` has the following implementations based on browser capability."," *  <ul>"," *      <li><a href=\"SVGPath.html\">`SVGPath`</a></li>"," *      <li><a href=\"VMLPath.html\">`VMLPath`</a></li>"," *      <li><a href=\"CanvasPath.html\">`CanvasPath`</a></li>"," *  </ul> "," * It is not necessary to interact with these classes directly. `Path` will point to the appropriate implemention.</p>"," *"," * @class Path"," * @extends Shape"," * @uses Drawing"," * @constructor"," */","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","/**"," * `Graphic` acts a factory and container for shapes. You need at least one `Graphic` instance to create shapes for your application. "," * <p>The code block below creates a `Graphic` instance and appends it to an HTMLElement with the id 'mygraphiccontainer'.</p>","    ","        var myGraphic = new Y.Graphic({render:\"#mygraphiccontainer\"});",""," * <p>Alternatively, you can add a `Graphic` instance to the DOM using the <a href=\"#method_render\">`render`</a> method.</p>","        var myGraphic = new Y.Graphic();","        myGraphic.render(\"#mygraphiccontainer\");",""," * `Graphic` has the following implementations based on browser capability."," *  <ul>"," *      <li><a href=\"SVGGraphic.html\">`SVGGraphic`</a></li>"," *      <li><a href=\"VMLGraphic.html\">`VMLGraphic`</a></li>"," *      <li><a href=\"CanvasGraphic.html\">`CanvasGraphic`</a></li>"," *  </ul>"," *"," * It is not necessary to interact with these classes directly. `Graphic` will point to the appropriate implemention.</p>"," *"," * @class Graphic"," * @constructor"," */","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node instance or a CSS selector string.","     * ","     * @config render","     * @type Node | String ","     */","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.","     *","     *  @config contentBounds","     *  @type Object ","     *  @readOnly","     */","    /**","     *  The html element that represents to coordinate system of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     *  @readOnly","     */","	/**","	 * Indicates the width of the `Graphic`. ","	 *","	 * @config width","	 * @type Number","	 */","	/**","	 * Indicates the height of the `Graphic`. ","	 *","	 * @config height ","	 * @type Number","	 */","    /**","     *  Determines how the size of instance is calculated. If true, the width and height are determined by the size of the contents.","     *  If false, the width and height values are either explicitly set or determined by the size of the parent node's dimensions.","     *","     *  @config autoSize","     *  @type Boolean","     *  @default false","     */","    /**","     * The contentBounds will resize to greater values but not to smaller values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown ","     * @type Boolean","     */","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","	/**","	 * Indicates whether the `Graphic` and its children are visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    /**","     * Adds the graphics node to the dom.","     * ","     * @method render","     * @param {Node|String} parentNode node in which to render the graphics node into.","     */","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    /**","     * <p>Generates a shape instance by type. The method accepts an object that contain's the shape's","     * type and attributes to be customized. For example, the code below would create a rectangle:</p>","     *","            var myRect = myGraphic.addShape({","                type: \"rect\",","                width: 40,","                height: 30,","                fill: {","                    color: \"#9aa\"","                },","                stroke: {","                    weight: 1,","                    color: \"#000\"","                }","            });","     *","     * <p>The `Graphics` module includes a few basic shapes. More information on their creation ","     * can be found in each shape's documentation:","     *","     *  <ul>","     *      <li><a href=\"Circle.html\">`Circle`</a></li>","     *      <li><a href=\"Ellipse.html\">`Ellipse`</a></li>","     *      <li><a href=\"Rect.html\">`Rect`</a></li>","     *      <li><a href=\"Path.html\">`Path`</a></li>","     *  </ul>","     *","     *  The `Graphics` module also allows for the creation of custom shapes. If a custom shape","     *  has been created, it can be instantiated with the `addShape` method as well. The attributes,","     *  required and optional, would need to be defined in the custom shape.","     *","            var myCustomShape = myGraphic.addShape({","                type: Y.MyCustomShape,","                width: 50,","                height: 50,","                fill: {","                    color: \"#9aa\"","                },","                stroke: {","                    weight: 1,","                    color: \"#000\"","                }","            });","     *","     * @method addShape","     * @param {Object} cfg Object containing the shape's type and attributes. ","     * @return Shape","     */","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","","","}, '@VERSION@' ,{requires:['event-custom', 'node', 'pluginhost', 'classnamemanager', 'matrix']});"];
_yuitest_coverage["/build/graphics/graphics.js"].lines = {"1":0,"32":0,"50":0,"52":0,"55":0,"57":0,"58":0,"59":0,"62":0,"72":0,"78":0,"80":0,"82":0,"83":0,"85":0,"87":0,"89":0,"90":0,"92":0,"96":0,"101":0,"102":0,"104":0,"106":0,"107":0,"109":0,"112":0,"114":0,"117":0,"119":0,"121":0,"125":0,"141":0,"144":0,"146":0,"147":0,"149":0,"151":0,"153":0,"156":0,"158":0,"172":0,"173":0,"175":0,"177":0,"179":0,"185":0,"201":0,"205":0,"207":0,"208":0,"210":0,"211":0,"213":0,"217":0,"220":0,"224":0,"225":0,"236":0,"238":0,"240":0,"241":0,"244":0,"245":0,"246":0,"247":0,"248":0,"249":0,"251":0,"253":0,"256":0,"258":0,"268":0,"271":0,"272":0,"276":0,"277":0,"278":0,"279":0,"280":0,"281":0};
_yuitest_coverage["/build/graphics/graphics.js"].functions = {"AttributeLite:50":0,"addAttrs:70":0,"get:139":0,"set:170":0,"_set:199":0,"GraphicBase:236":0,"init:266":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/graphics/graphics.js"].coveredLines = 81;
_yuitest_coverage["/build/graphics/graphics.js"].coveredFunctions = 8;
_yuitest_coverline("/build/graphics/graphics.js", 1);
YUI.add('graphics', function(Y) {

/**
 * 
 * <p>The `Graphics` module provides a JavaScript API for creating shapes in a variety of formats across 
 * a <a href="http://developer.yahoo.com/yui/articles/gbs">browser test baseline</a>. 
 * Based on device and browser capabilities, `Graphics` leverages <a href="http://www.w3.org/TR/SVG/">SVG</a>, 
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> and <a href="http://www.w3.org/TR/NOTE-VML">VML</a> 
 * to render its graphical elements.</p>
 *
 * <p>The `Graphics` module features a <a href="../classes/Graphic.html">`Graphic`</a> class that allows you to easily create and manage shapes. 
 * Currently, a <a href="../classes/Graphic.html">`Graphic`</a> instance can be used to create predifined shapes and free-form polygons with fill 
 * and stroke properties.</p>  
 *
 * <p>The `Graphics` module normalizes an API through the use of alias and implementation classes that share
 * interfaces. Each alias class points to an appropriate implementation class dependent on the browser's 
 * capabilities. There should rarely, if ever, be a need to interact directly with an implementation class.</p>
 *
 * <p>Below is a list of available classes. 
 *     <ul>
 *         <li><a href="../classes/Graphic.html">`Graphic`</a>
 *         <li><a href="../classes/Shape.html">`Shape`</a>
 *         <li><a href="../classes/Circle.html">`Circle`</a>
 *         <li><a href="../classes/Ellipse.html">`Ellipse`</a>
 *         <li><a href="../classes/Rect.html">`Rect`</a>
 *         <li><a href="../classes/Path.html">`Path`</a>
 *     </ul>
 * You can also extend the `Shape` class to create your own custom shape classes.</p>
 * @module graphics
 * @main graphics
 */
_yuitest_coverfunc("/build/graphics/graphics.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/graphics/graphics.js", 32);
var SETTER = "setter",
	PluginHost = Y.Plugin.Host,
    VALUE = "value",
    VALUEFN = "valueFn",
    READONLY = "readOnly",
    Y_LANG = Y.Lang,
    STR = "string",
    WRITE_ONCE = "writeOnce",
    GraphicBase,
    AttributeLite;
    
    /**
	 * AttributeLite provides Attribute-like getters and setters for shape classes in the Graphics module. It provides a get/set API without the event infastructure.
     * This class is temporary and a work in progress.
	 *
	 * @class AttributeLite
	 * @constructor
	 */
    _yuitest_coverline("/build/graphics/graphics.js", 50);
AttributeLite = function()
    {
        _yuitest_coverfunc("/build/graphics/graphics.js", "AttributeLite", 50);
_yuitest_coverline("/build/graphics/graphics.js", 52);
var host = this; // help compression
        
        // Perf tweak - avoid creating event literals if not required.
        _yuitest_coverline("/build/graphics/graphics.js", 55);
host._ATTR_E_FACADE = {};
        
        _yuitest_coverline("/build/graphics/graphics.js", 57);
Y.EventTarget.call(this, {emitFacade:true});
        _yuitest_coverline("/build/graphics/graphics.js", 58);
host._state = {};
        _yuitest_coverline("/build/graphics/graphics.js", 59);
host.prototype = Y.mix(AttributeLite.prototype, host.prototype);
    };

    _yuitest_coverline("/build/graphics/graphics.js", 62);
AttributeLite.prototype = {
		/**
		 * Initializes the attributes for a shape. If an attribute config is passed into the constructor of the host, 
		 * the initial values will be overwritten.
		 *
		 * @method addAttrs
		 * @param {Object} cfg Optional object containing attributes key value pairs to be set.
		 */
		addAttrs: function(cfg)
		{
			_yuitest_coverfunc("/build/graphics/graphics.js", "addAttrs", 70);
_yuitest_coverline("/build/graphics/graphics.js", 72);
var host = this,
				attrConfig = this.constructor.ATTRS, 
				attr,
				i,
				fn,
				state = host._state;
			_yuitest_coverline("/build/graphics/graphics.js", 78);
for(i in attrConfig)
			{
				_yuitest_coverline("/build/graphics/graphics.js", 80);
if(attrConfig.hasOwnProperty(i))
				{
					_yuitest_coverline("/build/graphics/graphics.js", 82);
attr = attrConfig[i];
					_yuitest_coverline("/build/graphics/graphics.js", 83);
if(attr.hasOwnProperty(VALUE))
					{
						_yuitest_coverline("/build/graphics/graphics.js", 85);
state[i] = attr.value;
					}
					else {_yuitest_coverline("/build/graphics/graphics.js", 87);
if(attr.hasOwnProperty(VALUEFN))
					{
						_yuitest_coverline("/build/graphics/graphics.js", 89);
fn = attr.valueFn;
						_yuitest_coverline("/build/graphics/graphics.js", 90);
if(Y_LANG.isString(fn))
						{
							_yuitest_coverline("/build/graphics/graphics.js", 92);
state[i] = host[fn].apply(host);
						}
						else
						{
							_yuitest_coverline("/build/graphics/graphics.js", 96);
state[i] = fn.apply(host);
						}
					}}
			    }
            }
			_yuitest_coverline("/build/graphics/graphics.js", 101);
host._state = state;
            _yuitest_coverline("/build/graphics/graphics.js", 102);
for(i in attrConfig)
			{
				_yuitest_coverline("/build/graphics/graphics.js", 104);
if(attrConfig.hasOwnProperty(i))
				{
					_yuitest_coverline("/build/graphics/graphics.js", 106);
attr = attrConfig[i];
                    _yuitest_coverline("/build/graphics/graphics.js", 107);
if(attr.hasOwnProperty(READONLY) && attr.readOnly)
					{
						_yuitest_coverline("/build/graphics/graphics.js", 109);
continue;
					}

					_yuitest_coverline("/build/graphics/graphics.js", 112);
if(attr.hasOwnProperty(WRITE_ONCE) && attr.writeOnce)
					{
						_yuitest_coverline("/build/graphics/graphics.js", 114);
attr.readOnly = true;
					}

					_yuitest_coverline("/build/graphics/graphics.js", 117);
if(cfg && cfg.hasOwnProperty(i))
					{
						_yuitest_coverline("/build/graphics/graphics.js", 119);
if(attr.hasOwnProperty(SETTER))
						{
							_yuitest_coverline("/build/graphics/graphics.js", 121);
host._state[i] = attr.setter.apply(host, [cfg[i]]);
						}
						else
						{
							_yuitest_coverline("/build/graphics/graphics.js", 125);
host._state[i] = cfg[i];
						}
					}
				}
			}
		},

        /**
         * For a given item, returns the value of the property requested, or undefined if not found.
         *
         * @method get
         * @param name {String} The name of the item
         * @return {Any} The value of the supplied property.
         */
        get: function(attr)
        {
            _yuitest_coverfunc("/build/graphics/graphics.js", "get", 139);
_yuitest_coverline("/build/graphics/graphics.js", 141);
var host = this,
                getter,
                attrConfig = host.constructor.ATTRS;
            _yuitest_coverline("/build/graphics/graphics.js", 144);
if(attrConfig && attrConfig[attr])
            {
                _yuitest_coverline("/build/graphics/graphics.js", 146);
getter = attrConfig[attr].getter;
                _yuitest_coverline("/build/graphics/graphics.js", 147);
if(getter)
                {
                    _yuitest_coverline("/build/graphics/graphics.js", 149);
if(typeof getter == STR)
                    {
                        _yuitest_coverline("/build/graphics/graphics.js", 151);
return host[getter].apply(host);
                    }
                    _yuitest_coverline("/build/graphics/graphics.js", 153);
return attrConfig[attr].getter.apply(host);
                }

                _yuitest_coverline("/build/graphics/graphics.js", 156);
return host._state[attr];
            }
            _yuitest_coverline("/build/graphics/graphics.js", 158);
return null;
        },
    
        /**
         * Sets the value of an attribute.
         *
         * @method set
         * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can 
         * be passed in to set multiple attributes at once.
         * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as 
         * the name param.
         */
        set: function(attr, val)
        {
            _yuitest_coverfunc("/build/graphics/graphics.js", "set", 170);
_yuitest_coverline("/build/graphics/graphics.js", 172);
var i;
            _yuitest_coverline("/build/graphics/graphics.js", 173);
if(Y_LANG.isObject(attr))
            {
                _yuitest_coverline("/build/graphics/graphics.js", 175);
for(i in attr)
                {
                    _yuitest_coverline("/build/graphics/graphics.js", 177);
if(attr.hasOwnProperty(i))
                    {
                        _yuitest_coverline("/build/graphics/graphics.js", 179);
this._set(i, attr[i]);
                    }
                }
            }
            else
            {
                _yuitest_coverline("/build/graphics/graphics.js", 185);
this._set.apply(this, arguments);
            }
        },

		/**
         * Provides setter logic. Used by `set`.
         *
         * @method _set
         * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can 
         * be passed in to set multiple attributes at once.
         * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as 
         * the name param.
		 * @protected
		 */
		_set: function(attr, val)
		{
			_yuitest_coverfunc("/build/graphics/graphics.js", "_set", 199);
_yuitest_coverline("/build/graphics/graphics.js", 201);
var host = this,
				setter,
				args,
				attrConfig = host.constructor.ATTRS;
			_yuitest_coverline("/build/graphics/graphics.js", 205);
if(attrConfig && attrConfig.hasOwnProperty(attr))
			{
				_yuitest_coverline("/build/graphics/graphics.js", 207);
setter = attrConfig[attr].setter;
				_yuitest_coverline("/build/graphics/graphics.js", 208);
if(setter)
				{
					_yuitest_coverline("/build/graphics/graphics.js", 210);
args = [val];
					_yuitest_coverline("/build/graphics/graphics.js", 211);
if(typeof setter == STR)
					{
						_yuitest_coverline("/build/graphics/graphics.js", 213);
val = host[setter].apply(host, args);
					}
					else
                    {
					    _yuitest_coverline("/build/graphics/graphics.js", 217);
val = attrConfig[attr].setter.apply(host, args);
                    }
				}
				_yuitest_coverline("/build/graphics/graphics.js", 220);
host._state[attr] = val;
			}
		}
	};
    _yuitest_coverline("/build/graphics/graphics.js", 224);
Y.mix(AttributeLite, Y.EventTarget, false, null, 1);
	_yuitest_coverline("/build/graphics/graphics.js", 225);
Y.AttributeLite = AttributeLite;

    /**
     * GraphicBase serves as the base class for the graphic layer. It serves the same purpose as
     * Base but uses a lightweight getter/setter class instead of Attribute.
     * This class is temporary and a work in progress.
     *
     * @class GraphicBase
     * @constructor
     * @param {Object} cfg Key value pairs for attributes
     */
    _yuitest_coverline("/build/graphics/graphics.js", 236);
GraphicBase = function(cfg)
    {
        _yuitest_coverfunc("/build/graphics/graphics.js", "GraphicBase", 236);
_yuitest_coverline("/build/graphics/graphics.js", 238);
var host = this,
            PluginHost = Y.Plugin && Y.Plugin.Host;  
        _yuitest_coverline("/build/graphics/graphics.js", 240);
if (host._initPlugins && PluginHost) {
            _yuitest_coverline("/build/graphics/graphics.js", 241);
PluginHost.call(host);
        }
        
        _yuitest_coverline("/build/graphics/graphics.js", 244);
host.name = host.constructor.NAME;
        _yuitest_coverline("/build/graphics/graphics.js", 245);
host._eventPrefix = host.constructor.EVENT_PREFIX || host.constructor.NAME;
        _yuitest_coverline("/build/graphics/graphics.js", 246);
AttributeLite.call(host);
        _yuitest_coverline("/build/graphics/graphics.js", 247);
host.addAttrs(cfg);
        _yuitest_coverline("/build/graphics/graphics.js", 248);
host.init.apply(this, arguments);
        _yuitest_coverline("/build/graphics/graphics.js", 249);
if (host._initPlugins) {
            // Need to initPlugins manually, to handle constructor parsing, static Plug parsing
            _yuitest_coverline("/build/graphics/graphics.js", 251);
host._initPlugins(cfg);
        }
        _yuitest_coverline("/build/graphics/graphics.js", 253);
host.initialized = true;
    };

    _yuitest_coverline("/build/graphics/graphics.js", 256);
GraphicBase.NAME = "baseGraphic";

    _yuitest_coverline("/build/graphics/graphics.js", 258);
GraphicBase.prototype = {
        /**
         * Init method, invoked during construction.
         * Fires an init event after calling `initializer` on implementers.
         *
         * @method init
         * @protected 
         */
        init: function()
        {
            _yuitest_coverfunc("/build/graphics/graphics.js", "init", 266);
_yuitest_coverline("/build/graphics/graphics.js", 268);
this.publish("init", {
                fireOnce:true
            });
            _yuitest_coverline("/build/graphics/graphics.js", 271);
this.initializer.apply(this, arguments);
            _yuitest_coverline("/build/graphics/graphics.js", 272);
this.fire("init", {cfg: arguments[0]});
        }
    };
//Straightup augment, no wrapper functions
_yuitest_coverline("/build/graphics/graphics.js", 276);
Y.mix(GraphicBase, Y.AttributeLite, false, null, 1);
_yuitest_coverline("/build/graphics/graphics.js", 277);
Y.mix(GraphicBase, PluginHost, false, null, 1);
_yuitest_coverline("/build/graphics/graphics.js", 278);
GraphicBase.prototype.constructor = GraphicBase;
_yuitest_coverline("/build/graphics/graphics.js", 279);
GraphicBase.plug = PluginHost.plug;
_yuitest_coverline("/build/graphics/graphics.js", 280);
GraphicBase.unplug = PluginHost.unplug;
_yuitest_coverline("/build/graphics/graphics.js", 281);
Y.GraphicBase = GraphicBase;


/**
 * `Drawing` provides a set of drawing methods used by `Path` and custom shape classes. 
 * `Drawing` has the following implementations based on browser capability.
 *  <ul>
 *      <li><a href="SVGDrawing.html">`SVGDrawing`</a></li>
 *      <li><a href="VMLDrawing.html">`VMLDrawing`</a></li>
 *      <li><a href="CanvasDrawing.html">`CanvasDrawing`</a></li>
 *  </ul>
 *
 * @class Drawing
 * @constructor
 */
    /**
     * Draws a line segment using the current line style from the current drawing position to the specified x and y coordinates.
     * 
     * @method lineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     */
    /**
     * Moves the current drawing position to specified x and y coordinates.
     *
     * @method moveTo
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    /**
     * Draws a bezier curve.
     *
     * @method curveTo
     * @param {Number} cp1x x-coordinate for the first control point.
     * @param {Number} cp1y y-coordinate for the first control point.
     * @param {Number} cp2x x-coordinate for the second control point.
     * @param {Number} cp2y y-coordinate for the second control point.
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    /**
     * Draws a quadratic bezier curve.
     *
     * @method quadraticCurveTo
     * @param {Number} cpx x-coordinate for the control point.
     * @param {Number} cpy y-coordinate for the control point.
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    /**
     * Draws a rectangle.
     *
     * @method drawRect
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     * @param {Number} w width
     * @param {Number} h height
     */
    /**
     * Draws a rectangle with rounded corners.
     * 
     * @method drawRoundRect
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     * @param {Number} w width
     * @param {Number} h height
     * @param {Number} ew width of the ellipse used to draw the rounded corners
     * @param {Number} eh height of the ellipse used to draw the rounded corners
     */
    /**
     * Completes a drawing operation. 
     *
     * @method end
     */
    /**
     * Clears the path.
     *
     * @method clear
     */
/**
 *  <p>Base class for creating shapes.</p>
 *  <p>`Shape` is an abstract class and is not meant to be used directly. The following classes extend
 *  `Shape`.
 *
 *  <ul>
 *      <li><a href="Circle.html">`Circle`</a></li>
 *      <li><a href="Ellipse.html">`Ellipse`</a></li>
 *      <li><a href="Rect.html">`Rect`</a></li>
 *      <li><a href="Path.html">`Path`</a></li>
 *  </ul>
 *
 * `Shape` can also be extended to create custom shape classes.</p>
 *
 * `Shape` has the following implementations based on browser capability.
 *  <ul>
 *      <li><a href="SVGShape.html">`SVGShape`</a></li>
 *      <li><a href="VMLShape.html">`VMLShape`</a></li>
 *      <li><a href="CanvasShape.html">`CanvasShape`</a></li>
 *  </ul>
 *
 * It is not necessary to interact with these classes directly. `Shape` will point to the appropriate implemention.</p>
 *
 * @class Shape
 * @constructor
 * @param {Object} cfg (optional) Attribute configs
 */
    /**
     * Init method, invoked during construction.
     * Calls `initializer` method.
     *
     * @method init
     * @protected
     */
	/**
	 * Initializes the shape
	 *
	 * @private
	 * @method initializer
	 */
	/**
	 * Add a class name to each node.
	 *
	 * @method addClass
	 * @param {String} className the class name to add to the node's class attribute 
	 */
	/**
	 * Removes a class name from each node.
	 *
	 * @method removeClass
	 * @param {String} className the class name to remove from the node's class attribute
	 */
	/**
	 * Gets the current position of the node in page coordinates.
	 *
	 * @method getXY
	 * @return Array The XY position of the shape.
	 */
	/**
	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.
	 *
	 * @method setXY
	 * @param {Array} Contains x & y values for new position (coordinates are page-based)
	 */
	/**
	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy. 
	 *
	 * @method contains
	 * @param {Shape | HTMLElement} needle The possible node or descendent
	 * @return Boolean Whether or not this shape is the needle or its ancestor.
	 */
	/**
	 * Compares nodes to determine if they match.
	 * Node instances can be compared to each other and/or HTMLElements.
	 * @method compareTo
	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.
	 * @return {Boolean} True if the nodes match, false if they do not.
	 */
	/**
	 * Test if the supplied node matches the supplied selector.
	 *
	 * @method test
	 * @param {String} selector The CSS selector to test against.
	 * @return Boolean Wheter or not the shape matches the selector.
	 */
    /**
     * Sets the value of an attribute.
     *
     * @method set
     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can 
     * be passed in to set multiple attributes at once.
     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as 
     * the name param.
     */
	/**
	 * Specifies a 2d translation.
	 *
	 * @method translate
	 * @param {Number} x The value to transate on the x-axis.
	 * @param {Number} y The value to translate on the y-axis.
	 */
	/**
	 * Translates the shape along the x-axis. When translating x and y coordinates,
	 * use the `translate` method.
	 *
	 * @method translateX
	 * @param {Number} x The value to translate.
	 */
	/**
	 * Translates the shape along the y-axis. When translating x and y coordinates,
	 * use the `translate` method.
	 *
	 * @method translateY
	 * @param {Number} y The value to translate.
	 */
    /**
     * Skews the shape around the x-axis and y-axis.
     *
     * @method skew
     * @param {Number} x The value to skew on the x-axis.
     * @param {Number} y The value to skew on the y-axis.
     */
	/**
	 * Skews the shape around the x-axis.
	 *
	 * @method skewX
	 * @param {Number} x x-coordinate
	 */
	/**
	 * Skews the shape around the y-axis.
	 *
	 * @method skewY
	 * @param {Number} y y-coordinate
	 */
	/**
	 * Rotates the shape clockwise around it transformOrigin.
	 *
	 * @method rotate
	 * @param {Number} deg The degree of the rotation.
	 */
	/**
	 * Specifies a 2d scaling operation.
	 *
	 * @method scale
	 * @param {Number} val
	 */
	/**
	 * Returns the bounds for a shape.
	 *
     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.
     * The calculated bounding box is used by the graphic instance to calculate its viewBox. 
     *
	 * @method getBounds
	 * @return Object
	 */
    /**
     * Destroys the instance.
     *
     * @method destroy
     */
	/**
	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a 
	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].
	 *
	 * @config transformOrigin
	 * @type Array
	 */
    /**
     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:
     *     
     *    <dl>
     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>
     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>
     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>
     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>
     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>
     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>
     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>
     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>
     *    </dl>
     * </p>
     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains corresponding methods for each transform
     * that will apply the transform to the current matrix. The below code illustrates how you might use the `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>
            var myRect = new Y.Rect({
                type:"rect",
                width: 50,
                height: 40,
                transform: "rotate(45)"
            };
     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>
    
        myRect.set("transform", "translate(40, 50) rotate(45)");
	 * @config transform
     * @type String  
	 */
	/**
	 * Unique id for class instance.
	 *
	 * @config id
	 * @type String
	 */
	/**
	 * Indicates the x position of shape.
	 *
	 * @config x
	 * @type Number
	 */
	/**
	 * Indicates the y position of shape.
	 *
	 * @config y
	 * @type Number
	 */
	/**
	 * Indicates the width of the shape
	 *
	 * @config width
	 * @type Number
	 */
	/**
	 * Indicates the height of the shape
	 * 
	 * @config height
	 * @type Number
	 */
	/**
	 * Indicates whether the shape is visible.
	 *
	 * @config visible
	 * @type Boolean
	 */
	/**
	 * Contains information about the fill of the shape. 
     *  <dl>
     *      <dt>color</dt><dd>The color of the fill.</dd>
     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>
     *      <dt>type</dt><dd>Type of fill.
     *          <dl>
     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>
     *              <dt>linear</dt><dd>Linear gradient fill.</dd>
     *              <dt>radial</dt><dd>Radial gradient fill.</dd>
     *          </dl>
     *      </dd>
     *  </dl>
     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:
     *  <dl>
     *      <dt>stops</dt><dd>An array of objects containing the following properties:
     *          <dl>
     *              <dt>color</dt><dd>The color of the stop.</dd>
     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1. Note: No effect for IE 6 - 8</dd>
     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd> 
     *          </dl>
     *      </dd>
     *      <p>Linear gradients also have the following property:</p>
     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>
     *      <p>Radial gradients have the following additional properties:</p>
     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>
     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>
     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>
     *      <dt>cx</dt><dd>
     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>
     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape` classes which are used on Android or IE 6 - 8.</p>
     *      </dd>
     *      <dt>cy</dt><dd>
     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>
     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape` classes which are used on Android or IE 6 - 8.</p>
     *      </dd>
     *  </dl>
	 *
	 * @config fill
	 * @type Object 
	 */
	/**
	 * Contains information about the stroke of the shape.
     *  <dl>
     *      <dt>color</dt><dd>The color of the stroke.</dd>
     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>
     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>
     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to "none", a solid stroke is drawn. When set to an array, the first index indicates the
     *  length of the dash. The second index indicates the length of gap.
     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:
     *          <dl>
     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>
     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>
     *              <dt>round</dt><dd>Specifies a round linecap.</dd>
     *          </dl>
     *      </dd>
     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:
     *          <dl>
     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>
     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>
     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin of miter, you simply specify the limit as opposed to having
     *  separate miter and miter limit values.</dd>
     *          </dl>
     *      </dd>
     *  </dl>
	 *
	 * @config stroke
	 * @type Object
	 */
	/**
	 * Dom node for the shape.
	 *
	 * @config node
	 * @type HTMLElement
	 * @readOnly
	 */
	/**
	 * Reference to the parent graphic instance
	 *
	 * @config graphic
	 * @type Graphic
	 * @readOnly
	 */

/**
 * <p>Creates circle shape with editable attributes.</p> 
 * <p>`Circle` instances can be created using the <a href="Graphic.html#method_addShape">`addShape`</a> method of the <a href="Graphic.html">`Graphic`</a> class. 
 * The method's `cfg` argument contains a `type` attribute. Assigning "circle" or `Y.Circle` to this attribute will create a `Circle` instance. Required attributes
 * for instantiating a `Circle` are `type` and `radius`. Optional attributes include:
 *  <ul>
 *      <li><a href="#attr_fill">fill</a></li>
 *      <li><a href="#attr_id">id</a></li>
 *      <li><a href="#attr_stroke">stroke</a></li>
 *      <li><a href="#attr_transform">transform</a></li>
 *      <li><a href="#attr_transformOrigin">transformOrigin</a></li>
 *      <li><a href="#attr_visible">visible</a></li>
 *      <li><a href="#attr_x">x</a></li>
 *      <li><a href="#attr_y">y</a></li>
 *  </ul>
 * 
 * The below code creates a circle by defining the `type` attribute as "circle":</p>

        var myCircle = myGraphic.addShape({
            type: "circle",
            radius: 10,
            fill: {
                color: "#9aa"
            },
            stroke: {
                weight: 1,
                color: "#000"
            }
        });

 * Below, this same circle is created by defining the `type` attribute with a class reference:
 *
        var myCircle = myGraphic.addShape({
            type: Y.Circle,
            radius: 10,
            fill: {
                color: "#9aa"
            },
            stroke: {
                weight: 1,
                color: "#000"
            }
        });
 * 
 * <p>`Circle` has the following implementations based on browser capability.
 *  <ul>
 *      <li><a href="SVGCircle.html">`SVGCircle`</a></li>
 *      <li><a href="VMLCircle.html">`VMLCircle`</a></li>
 *      <li><a href="CanvasCircle.html">`CanvasCircle`</a></li>
 *  </ul>
 *
 * It is not necessary to interact with these classes directly. `Circle` will point to the appropriate implemention.</p>
 *
 * @class Circle
 * @extends Shape
 * @constructor
 */
    /**
     * Radius of the circle
     *
     * @config radius
     * @type Number
     */
/**
 * <p>Creates an ellipse shape with editable attributes.</p>
 * <p>`Ellipse` instances can be created using the <a href="Graphic.html#method_addShape">`addShape`</a> method of the <a href="Graphic.html">`Graphic`</a> class. 
 * The method's `cfg` argument contains a `type` attribute. Assigning "ellipse" or `Y.Ellipse` to this attribute will create a `Ellipse` instance. Required attributes
 * for instantiating a `Ellipse` are `type`, `width` and `height`. Optional attributes include:
 *  <ul>
 *      <li><a href="#attr_fill">fill</a></li>
 *      <li><a href="#attr_id">id</a></li>
 *      <li><a href="#attr_stroke">stroke</a></li>
 *      <li><a href="#attr_transform">transform</a></li>
 *      <li><a href="#attr_transformOrigin">transformOrigin</a></li>
 *      <li><a href="#attr_visible">visible</a></li>
 *      <li><a href="#attr_x">x</a></li>
 *      <li><a href="#attr_y">y</a></li>
 *  </ul>
 * 
 * The below code creates an ellipse by defining the `type` attribute as "ellipse":</p>

        var myEllipse = myGraphic.addShape({
            type: "ellipse",
            width: 20,
            height: 10,
            fill: {
                color: "#9aa"
            },
            stroke: {
                weight: 1,
                color: "#000"
            }
        });

 * Below, the same ellipse is created by defining the `type` attribute with a class reference:
 *
        var myEllipse = myGraphic.addShape({
            type: Y.Ellipse,
            width: 20,
            height: 10,
            fill: {
                color: "#9aa"
            },
            stroke: {
                weight: 1,
                color: "#000"
            }
        });
 * 
 * <p>`Ellipse` has the following implementations based on browser capability.
 *  <ul>
 *      <li><a href="SVGEllipse.html">`SVGEllipse`</a></li>
 *      <li><a href="VMLEllipse.html">`VMLEllipse`</a></li>
 *      <li><a href="CanvasEllipse.html">`CanvasEllipse`</a></li>
 *  </ul>
 *
 * It is not necessary to interact with these classes directly. `Ellipse` will point to the appropriate implemention.</p>
 *
 * @class Ellipse
 * @extends Shape
 * @constructor
 */
/**
 * <p>Creates an rectangle shape with editable attributes.</p>
 * <p>`Rect` instances can be created using the <a href="Graphic.html#method_addShape">`addShape`</a> method of the <a href="Graphic.html">`Graphic`</a> 
 * class. The method's `cfg` argument contains a `type` attribute. Assigning "rect" or `Y.Rect` to this attribute will create a `Rect` instance. 
 * Required attributes for instantiating a `Rect` are `type`, `width` and `height`. Optional attributes include:
 *  <ul>
 *      <li><a href="#attr_fill">fill</a></li>
 *      <li><a href="#attr_id">id</a></li>
 *      <li><a href="#attr_stroke">stroke</a></li>
 *      <li><a href="#attr_transform">transform</a></li>
 *      <li><a href="#attr_transformOrigin">transformOrigin</a></li>
 *      <li><a href="#attr_visible">visible</a></li>
 *      <li><a href="#attr_x">x</a></li>
 *      <li><a href="#attr_y">y</a></li>
 *  </ul>
 *
 * The below code creates a rectangle by defining the `type` attribute as "rect":</p>

        var myRect = myGraphic.addShape({
            type: "rect",
            width: 20,
            height: 10,
            fill: {
                color: "#9aa"
            },
            stroke: {
                weight: 1,
                color: "#000"
            }
        });

 * Below, the same rectangle is created by defining the `type` attribute with a class reference:
 *
        var myRect = myGraphic.addShape({
            type: Y.Rect,
            width: 20,
            height: 10,
            fill: {
                color: "#9aa"
            },
            stroke: {
                weight: 1,
                color: "#000"
            }
        });
 *
 * <p>`Rect` has the following implementations based on browser capability.
 *  <ul>
 *      <li><a href="SVGRect.html">`SVGRect`</a></li>
 *      <li><a href="VMLRect.html">`VMLRect`</a></li>
 *      <li><a href="CanvasRect.html">`CanvasRect`</a></li>
 *  </ul>
 *
 * It is not necessary to interact with these classes directly. `Rect` will point to the appropriate implemention.</p>
 *
 * @class Rect
 * @extends Shape
 * @constructor
 */
/**
 * <p>The `Path` class creates a shape through the use of drawing methods. The `Path` class has the following drawing methods available:</p>
 *  <ul>
 *      <li><a href="#method_clear">`clear`</a></li>
 *      <li><a href="#method_curveTo">`curveTo`</a></li>
 *      <li><a href="#method_drawRect">`drawRect`</a></li>
 *      <li><a href="#method_drawRoundRect">`drawRoundRect`</a></li>
 *      <li><a href="#method_end">`end`</a></li>
 *      <li><a href="#method_lineTo">`lineTo`</a></li>
 *      <li><a href="#method_moveTo">`moveTo`</a></li>
 *      <li><a href="#method_quadraticCurveTo">`quadraticCurveTo`</a></li>
 *  </ul>
 *
 *  <p>Like other shapes, `Path` elements are created using the <a href="Graphic.html#method_addShape">`addShape`</a> method of the <a href="Graphic.html">`Graphic`</a> 
 *  class. The method's `cfg` argument contains a `type` attribute. Assigning "path" or `Y.Path` to this attribute will create a `Path` instance.
 *  After instantiation, a series of drawing operations must be performed in order to render a shape. The below code instantiates a path element by defining the `type` 
 *  attribute as "path":</p>

        var myPath = myGraphic.addShape({
            type: "path",
            fill: {
                color: "#9aa"
            },
            stroke: {
                weight: 1,
                color: "#000"
            }
        });

 * Below a `Path` element with the same properties is instantiated by defining the `type` attribute with a class reference:
 *
        var myPath = myGraphic.addShape({
            type: Y.Path,
            fill: {
                color: "#9aa"
            },
            stroke: {
                weight: 1,
                color: "#000"
            }
        });

 * After instantiation, a shape or segment needs to be drawn for an element to render. After all draw operations are performed, the <a href="#method_end">`end`</a>
 * method will render the shape. The code below will draw a triangle:
 
        myPath.moveTo(35, 5);
        myPath.lineTo(65, 65);
        myPath.lineTo(5, 65);
        myPath.lineTo(35, 5);
        myPath.end();
 *
 * <p>`Path` has the following implementations based on browser capability.
 *  <ul>
 *      <li><a href="SVGPath.html">`SVGPath`</a></li>
 *      <li><a href="VMLPath.html">`VMLPath`</a></li>
 *      <li><a href="CanvasPath.html">`CanvasPath`</a></li>
 *  </ul> 
 * It is not necessary to interact with these classes directly. `Path` will point to the appropriate implemention.</p>
 *
 * @class Path
 * @extends Shape
 * @uses Drawing
 * @constructor
 */
	/**
	 * Indicates the path used for the node.
	 *
	 * @config path
	 * @type String
     * @readOnly
	 */
/**
 * `Graphic` acts a factory and container for shapes. You need at least one `Graphic` instance to create shapes for your application. 
 * <p>The code block below creates a `Graphic` instance and appends it to an HTMLElement with the id 'mygraphiccontainer'.</p>
    
        var myGraphic = new Y.Graphic({render:"#mygraphiccontainer"});

 * <p>Alternatively, you can add a `Graphic` instance to the DOM using the <a href="#method_render">`render`</a> method.</p>
        var myGraphic = new Y.Graphic();
        myGraphic.render("#mygraphiccontainer");

 * `Graphic` has the following implementations based on browser capability.
 *  <ul>
 *      <li><a href="SVGGraphic.html">`SVGGraphic`</a></li>
 *      <li><a href="VMLGraphic.html">`VMLGraphic`</a></li>
 *      <li><a href="CanvasGraphic.html">`CanvasGraphic`</a></li>
 *  </ul>
 *
 * It is not necessary to interact with these classes directly. `Graphic` will point to the appropriate implemention.</p>
 *
 * @class Graphic
 * @constructor
 */
    /**
     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node instance or a CSS selector string.
     * 
     * @config render
     * @type Node | String 
     */
    /**
	 * Unique id for class instance.
	 *
	 * @config id
	 * @type String
	 */
    /**
     * Key value pairs in which a shape instance is associated with its id.
     *
     *  @config shapes
     *  @type Object
     *  @readOnly
     */
    /**
     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.
     *
     *  @config contentBounds
     *  @type Object 
     *  @readOnly
     */
    /**
     *  The html element that represents to coordinate system of the Graphic instance.
     *
     *  @config node
     *  @type HTMLElement
     *  @readOnly
     */
	/**
	 * Indicates the width of the `Graphic`. 
	 *
	 * @config width
	 * @type Number
	 */
	/**
	 * Indicates the height of the `Graphic`. 
	 *
	 * @config height 
	 * @type Number
	 */
    /**
     *  Determines how the size of instance is calculated. If true, the width and height are determined by the size of the contents.
     *  If false, the width and height values are either explicitly set or determined by the size of the parent node's dimensions.
     *
     *  @config autoSize
     *  @type Boolean
     *  @default false
     */
    /**
     * The contentBounds will resize to greater values but not to smaller values. (for performance)
     * When resizing the contentBounds down is desirable, set the resizeDown value to true.
     *
     * @config resizeDown 
     * @type Boolean
     */
	/**
	 * Indicates the x-coordinate for the instance.
	 *
	 * @config x
	 * @type Number
	 */
	/**
	 * Indicates the y-coordinate for the instance.
	 *
	 * @config y
	 * @type Number
	 */
    /**
     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.
     * This property will get set to false when batching operations.
     *
     * @config autoDraw
     * @type Boolean
     * @default true
     * @private
     */
	/**
	 * Indicates whether the `Graphic` and its children are visible.
	 *
	 * @config visible
	 * @type Boolean
	 */
    /**
     * Gets the current position of the graphic instance in page coordinates.
     *
     * @method getXY
     * @return Array The XY position of the shape.
     */
    /**
     * Adds the graphics node to the dom.
     * 
     * @method render
     * @param {Node|String} parentNode node in which to render the graphics node into.
     */
    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    /**
     * <p>Generates a shape instance by type. The method accepts an object that contain's the shape's
     * type and attributes to be customized. For example, the code below would create a rectangle:</p>
     *
            var myRect = myGraphic.addShape({
                type: "rect",
                width: 40,
                height: 30,
                fill: {
                    color: "#9aa"
                },
                stroke: {
                    weight: 1,
                    color: "#000"
                }
            });
     *
     * <p>The `Graphics` module includes a few basic shapes. More information on their creation 
     * can be found in each shape's documentation:
     *
     *  <ul>
     *      <li><a href="Circle.html">`Circle`</a></li>
     *      <li><a href="Ellipse.html">`Ellipse`</a></li>
     *      <li><a href="Rect.html">`Rect`</a></li>
     *      <li><a href="Path.html">`Path`</a></li>
     *  </ul>
     *
     *  The `Graphics` module also allows for the creation of custom shapes. If a custom shape
     *  has been created, it can be instantiated with the `addShape` method as well. The attributes,
     *  required and optional, would need to be defined in the custom shape.
     *
            var myCustomShape = myGraphic.addShape({
                type: Y.MyCustomShape,
                width: 50,
                height: 50,
                fill: {
                    color: "#9aa"
                },
                stroke: {
                    weight: 1,
                    color: "#000"
                }
            });
     *
     * @method addShape
     * @param {Object} cfg Object containing the shape's type and attributes. 
     * @return Shape
     */
    /**
     * Removes a shape instance from from the graphic instance.
     *
     * @method removeShape
     * @param {Shape|String} shape The instance or id of the shape to be removed.
     */
    /**
     * Removes all shape instances from the dom.
     *
     * @method removeAllShapes
     */
    /**
     * Returns a shape based on the id of its dom node.
     *
     * @method getShapeById
     * @param {String} id Dom id of the shape's node attribute.
     * @return Shape
     */
	/**
	 * Allows for creating multiple shapes in order to batch appending and redraw operations.
	 *
	 * @method batch
	 * @param {Function} method Method to execute.
	 */


}, '@VERSION@' ,{requires:['event-custom', 'node', 'pluginhost', 'classnamemanager', 'matrix']});
