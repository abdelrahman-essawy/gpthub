"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoom = exports.CreateRoomInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var _core_1 = require("@core");
var CreateRoomInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)({ description: 'Input to create a new room' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _roomType_decorators;
    var _roomType_initializers = [];
    var _resourceIds_decorators;
    var _resourceIds_initializers = [];
    var CreateRoomInput = _classThis = /** @class */ (function () {
        function CreateRoomInput_1() {
            this.description = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.title = __runInitializers(this, _title_initializers, void 0);
            this.roomType = __runInitializers(this, _roomType_initializers, void 0);
            this.resourceIds = __runInitializers(this, _resourceIds_initializers, void 0);
        }
        return CreateRoomInput_1;
    }());
    __setFunctionName(_classThis, "CreateRoomInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _description_decorators = [(0, graphql_1.Field)(function () { return String; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(40)];
        _title_decorators = [(0, graphql_1.Field)(function () { return String; }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(20)];
        _roomType_decorators = [(0, graphql_1.Field)(function () { return String; }, { nullable: true }), (0, class_validator_1.IsEnum)(_core_1.RoomType), (0, class_validator_1.IsOptional)()];
        _resourceIds_decorators = [(0, graphql_1.Field)(function () { return [String]; }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUUID)('4', { each: true })];
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _roomType_decorators, { kind: "field", name: "roomType", static: false, private: false, access: { has: function (obj) { return "roomType" in obj; }, get: function (obj) { return obj.roomType; }, set: function (obj, value) { obj.roomType = value; } }, metadata: _metadata }, _roomType_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _resourceIds_decorators, { kind: "field", name: "resourceIds", static: false, private: false, access: { has: function (obj) { return "resourceIds" in obj; }, get: function (obj) { return obj.resourceIds; }, set: function (obj, value) { obj.resourceIds = value; } }, metadata: _metadata }, _resourceIds_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateRoomInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateRoomInput = _classThis;
}();
exports.CreateRoomInput = CreateRoomInput;
var CreateRoom = function () {
    var _a;
    var _classSuper = CreateRoomInput;
    var _instanceExtraInitializers = [];
    var _authorId_decorators;
    var _authorId_initializers = [];
    var _ownerIds_decorators;
    var _ownerIds_initializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(CreateRoom, _super);
            function CreateRoom() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.authorId = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _authorId_initializers, void 0));
                _this.ownerIds = __runInitializers(_this, _ownerIds_initializers, void 0);
                return _this;
            }
            return CreateRoom;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _authorId_decorators = [(0, graphql_1.Field)(function () { return String; }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUUID)('4')];
            _ownerIds_decorators = [(0, graphql_1.Field)(function () { return [String]; }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: function (obj) { return "authorId" in obj; }, get: function (obj) { return obj.authorId; }, set: function (obj, value) { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _ownerIds_decorators, { kind: "field", name: "ownerIds", static: false, private: false, access: { has: function (obj) { return "ownerIds" in obj; }, get: function (obj) { return obj.ownerIds; }, set: function (obj, value) { obj.ownerIds = value; } }, metadata: _metadata }, _ownerIds_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateRoom = CreateRoom;
