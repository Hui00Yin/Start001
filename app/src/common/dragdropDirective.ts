export function DragAndDrop(): ng.IDirective {
    return {
        restrict: 'A',
        controller: DragAndDrop,
        controllerAs: 'DnD',

        link: ($scope: ng.IScope, $element: ng.IAugmentedJQuery, attributes: ng.IAttributes, controller: DnDController): void => {
            var isDragHandleUsed = false,
            dragHandleClass,
            draggingClass = this.$attrs.draggingClass || 'on-dragging',
            dragTarget;

        this.$element.attr('draggable', false);

        this.$this.$scope.$watch(this.$attrs.uiDraggable, function(newValue) {
            if (newValue) {
                this.$element.attr('draggable', newValue);
                this.$element.bind('dragend', controller.dragendHandler);
                this.$element.bind('dragstart', controller.dragstartHandler);
            }
            else {
                this.$element.removeAttr('draggable');
                this.$element.unbind('dragend', controller.dragendHandler);
                this.$element.unbind('dragstart', controller.dragstartHandler);
            }

        });

        if (angular.isString(this.$attrs.dragHandleClass)) {
            isDragHandleUsed = true;
            dragHandleClass = this.$attrs.dragHandleClass.trim() || 'drag-handle';

            this.$element.bind('mousedown', function(e) {
                dragTarget = e.target;
            });
        }
        }
    };
}

export class DnDController{
    static $inject = ['$parse', '$rootscope', '$dragImage','$scope', '$element', '$attrs'];
    constructor(private $parse, private $rootscope, private $dragImage, private $scope, private $element, private $attrs) {
    }

    private isDnDsSupported() {
        return 'ondrag' in document.createElement('a');
    }

    private determineEffectAllowed(e) {
        if(e.originalEvent) {
          e.dataTransfer = e.originalEvent.dataTransfer;
        }

        // Chrome doesn't set dropEffect, so we have to work it out ourselves
        if (typeof e.dataTransfer !== 'undefined' && e.dataTransfer.dropEffect === 'none') {
            if (e.dataTransfer.effectAllowed === 'copy' ||
                e.dataTransfer.effectAllowed === 'move') {
                e.dataTransfer.dropEffect = e.dataTransfer.effectAllowed;
            } else if (e.dataTransfer.effectAllowed === 'copyMove' || e.dataTransfer.effectAllowed === 'copymove') {
                e.dataTransfer.dropEffect = e.ctrlKey ? 'copy' : 'move';
            }
        }
    }

    public dragendHandler(e) {
        if(e.originalEvent) {
            e.dataTransfer = e.originalEvent.dataTransfer;
        }

        setTimeout(function() {
            this.$element.unbind('$destroy', this.dragendHandler);
        }, 0);
        var sendChannel = this.$attrs.dragChannel || 'defaultchannel';
        this.$rootscope.$broadcast('ANGULAR_DRAG_END', e, sendChannel);

        this.determineEffectAllowed(e);

        if (e.dataTransfer && e.dataTransfer.dropEffect !== 'none') {
            if (this.$attrs.onDropSuccess) {
                var onDropSuccessFn = this.$parse(this.$attrs.onDropSuccess);
                this.$scope.$evalAsync(function() {
                    onDropSuccessFn(this.$scope, {$event: e});
                });
            }
        }else if (e.dataTransfer && e.dataTransfer.dropEffect === 'none'){
            if (this.$attrs.onDropFailure) {
                var onDropFailureFn = this.$parse(this.$attrs.onDropFailure);
                this.$scope.$evalAsync(function() {
                    onDropFailureFn(this.$scope, {$event: e});
                });
            }
        }
        this.$element.removeClass(draggingClass);
    }

    public setDragElement(e, dragImageElementId) {
        var dragImageElementFn;

        if(e.originalEvent) {
            e.dataTransfer = e.originalEvent.dataTransfer;
        }

        dragImageElementFn = this.$parse(dragImageElementId);

        this.$scope.$apply(function() {
            var elementId = dragImageElementFn(this.$this.$scope, {$event: e}),
                dragElement;

            if (!(this.$elementId && angular.isString(this.$elementId))) {
                return;
            }

            dragElement = document.getElementById(this.$elementId);

            if (!dragElement) {
                return;
            }

            e.dataTransfer.setDragImage(dragElement, 0, 0);
        });
    }

    public dragstartHandler(e) {
        if(e.originalEvent) {
            e.dataTransfer = e.originalEvent.dataTransfer;
        }

        var isDragAllowed = !isDragHandleUsed || dragTarget.classList.contains(dragHandleClass);

        if (isDragAllowed) {
            var sendChannel = this.$attrs.dragChannel || 'defaultchannel';
            var dragData = '';
            if (this.$attrs.drag) {
                dragData = this.$this.$scope.$eval(this.$attrs.drag);
            }

            var dragImage = this.$attrs.dragImage || null;

            this.$element.addClass(draggingClass);
            this.$element.bind('$destroy', this.dragendHandler);

            //Code to make sure that the setDragImage is available. IE 10, 11, and Opera do not support setDragImage.
            var hasNativeDraggable = !(document.uniqueID || window.opera);

            //If there is a draggable image passed in, then set the image to be dragged.
            if (dragImage && hasNativeDraggable) {
                var dragImageFn = this.$parse(this.$attrs.dragImage);
                this.$scope.$apply(function() {
                    var dragImageParameters = dragImageFn(this.$this.$scope, {$event: e});
                    if (dragImageParameters) {
                        if (angular.isString(dragImageParameters)) {
                            dragImageParameters = $dragImage.generate(dragImageParameters);
                        }
                        if (dragImageParameters.image) {
                            var xOffset = dragImageParameters.xOffset || 0,
                                yOffset = dragImageParameters.yOffset || 0;
                            e.dataTransfer.setDragImage(dragImageParameters.image, xOffset, yOffset);
                        }
                    }
                });
            } else if (this.$attrs.dragImagethis.$ElementId) {
                this.setDragElement(e, this.$attrs.dragImagethis.$ElementId);
            }

            var offset = {x: e.offsetX, y: e.offsetY};
            var transferDataObject = {data: dragData, channel: sendChannel, offset: offset};
            var transferDataText = angular.toJson(transferDataObject);

            e.dataTransfer.setData('text', transferDataText);
            e.dataTransfer.effectAllowed = 'copyMove';

            this.$rootscope.$broadcast('ANGULAR_DRAG_START', e, sendChannel, transferDataObject);
        }
        else {
            e.preventDefault();
        }
    }

}

export class DragDropDirective implements ng.IDirective{
    // Define our AppComponent's name
    static directiveName:string = "uidragDrop";

  /*
    * This static method is needed to return instance
    */
    static instance() : ng.IDirective {
        return new DragDropDirective;
    }

    

  

    

           

    restrict = 'E';
}

(function(angular) {
    'use strict';

    if (!isDnDsSupported()) {
        angular.module('ang-drag-drop', []);
        return;
    }

    var module = angular.module('ang-drag-drop', []);

    module.directive('uiDraggable', ['this.$parse', '$rootthis.$this.$scope', '$dragImage', function(this.$parse, $rootthis.$this.$scope, $dragImage) {
        return function(this.$this.$scope, this.$element, this.$attrs) {
            

            
            function dragstartHandler(e) {
                if(e.originalEvent) {
                  e.dataTransfer = e.originalEvent.dataTransfer;
                }

                var isDragAllowed = !isDragHandleUsed || dragTarget.classList.contains(dragHandleClass);

                if (isDragAllowed) {
                    var sendChannel = this.$attrs.dragChannel || 'defaultchannel';
                    var dragData = '';
                    if (this.$attrs.drag) {
                        dragData = this.$this.$scope.$eval(this.$attrs.drag);
                    }

                    var dragImage = this.$attrs.dragImage || null;

                    this.$element.addClass(draggingClass);
                    this.$element.bind('$destroy', dragendHandler);

                    //Code to make sure that the setDragImage is available. IE 10, 11, and Opera do not support setDragImage.
                    var hasNativeDraggable = !(document.uniqueID || window.opera);

                    //If there is a draggable image passed in, then set the image to be dragged.
                    if (dragImage && hasNativeDraggable) {
                        var dragImageFn = this.$parse(this.$attrs.dragImage);
                        this.$this.$scope.$apply(function() {
                            var dragImageParameters = dragImageFn(this.$this.$scope, {$event: e});
                            if (dragImageParameters) {
                                if (angular.isString(dragImageParameters)) {
                                    dragImageParameters = $dragImage.generate(dragImageParameters);
                                }
                                if (dragImageParameters.image) {
                                    var xOffset = dragImageParameters.xOffset || 0,
                                        yOffset = dragImageParameters.yOffset || 0;
                                    e.dataTransfer.setDragImage(dragImageParameters.image, xOffset, yOffset);
                                }
                            }
                        });
                    } else if (this.$attrs.dragImagethis.$ElementId) {
                        setDragthis.$Element(e, this.$attrs.dragImagethis.$ElementId);
                    }

                    var offset = {x: e.offsetX, y: e.offsetY};
                    var transferDataObject = {data: dragData, channel: sendChannel, offset: offset};
                    var transferDataText = angular.toJson(transferDataObject);

                    e.dataTransfer.setData('text', transferDataText);
                    e.dataTransfer.effectAllowed = 'copyMove';

                    $rootthis.$this.$scope.$broadcast('ANGULAR_DRAG_START', e, sendChannel, transferDataObject);
                }
                else {
                    e.preventDefault();
                }
            }
        };
    }
    ]);

    module.directive('uiOnDrop', ['this.$parse', '$rootthis.$this.$scope', function(this.$parse, $rootthis.$this.$scope) {
        return function(this.$this.$scope, this.$element, attr) {
            var dragging = 0; //Ref. http://stackoverflow.com/a/10906204
            var dropChannel = attr.dropChannel || 'defaultchannel';
            var dragChannel = '';
            var dragEnterClass = attr.dragEnterClass || 'on-drag-enter';
            var dragHoverClass = attr.dragHoverClass || 'on-drag-hover';
            var customDragEnterEvent = this.$parse(attr.onDragEnter);
            var customDragLeaveEvent = this.$parse(attr.onDragLeave);

            function calculateDropOffset(e) {
                var offset = {
                    x: e.offsetX,
                    y: e.offsetY
                };
                var target = e.target;

                while (target !== this.$element[0]) {
                    offset.x = offset.x + target.offsetLeft;
                    offset.y = offset.y + target.offsetTop;

                    target = target.offsetParent;
                    if (!target) {
                        return null;
                    }
                }

                return offset;
            }

            function onDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                var uiOnDragOverFn = this.$parse(attr.uiOnDragOver);
                this.$this.$scope.$evalAsync(function() {
                    uiOnDragOverFn(this.$this.$scope, {$event: e, $channel: dropChannel});
                });

                return false;
            }

            function onDragLeave(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                dragging--;

                if (dragging === 0) {
                    this.$this.$scope.$evalAsync(function() {
                        customDragLeaveEvent(this.$this.$scope, {$event: e, $channel: dropChannel});
                    });
                    this.$element.addClass(dragEnterClass);
                    this.$element.removeClass(dragHoverClass);
                }

                var uiOnDragLeaveFn = this.$parse(attr.uiOnDragLeave);
                this.$this.$scope.$evalAsync(function() {
                    uiOnDragLeaveFn(this.$this.$scope, {$event: e, $channel: dropChannel});
                });
            }

            function onDragEnter(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                if (dragging === 0) {
                    this.$this.$scope.$evalAsync(function() {
                        customDragEnterEvent(this.$this.$scope, {$event: e, $channel: dropChannel});
                    });
                    this.$element.removeClass(dragEnterClass);
                    this.$element.addClass(dragHoverClass);
                }
                dragging++;

                var uiOnDragEnterFn = this.$parse(attr.uiOnDragEnter);
                this.$this.$scope.$evalAsync(function() {
                    uiOnDragEnterFn(this.$this.$scope, {$event: e, $channel: dropChannel});
                });

                $rootthis.$this.$scope.$broadcast('ANGULAR_HOVER', dragChannel);
            }

            function onDrop(e) {
                if(e.originalEvent) {
                  e.dataTransfer = e.originalEvent.dataTransfer;
                }

                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                if (e.stopPropagation) {
                    e.stopPropagation(); // Necessary. Allows us to drop.
                }

                var sendData = e.dataTransfer.getData('text');
                sendData = angular.fromJson(sendData);

                var dropOffset = calculateDropOffset(e);
                
                var position = dropOffset ? {
                    x: dropOffset.x - sendData.offset.x,
                    y: dropOffset.y - sendData.offset.y
                } : null;
                
                determineEffectAllowed(e);

                var uiOnDropFn = this.$parse(attr.uiOnDrop);
                this.$this.$scope.$evalAsync(function() {
                    uiOnDropFn(this.$this.$scope, {$data: sendData.data, $event: e, $channel: sendData.channel, $position: position});
                });
                this.$element.removeClass(dragEnterClass);
                dragging = 0;
            }
            
            function isDragChannelAccepted(dragChannel, dropChannel) {
                if (dropChannel === '*') {
                    return true;
                }

                var channelMatchPattern = new RegExp('(\\s|[,])+(' + dragChannel + ')(\\s|[,])+', 'i');

                return channelMatchPattern.test(',' + dropChannel + ',');
            }

            function preventNativeDnD(e) {
                if(e.originalEvent) {
                  e.dataTransfer = e.originalEvent.dataTransfer;
                }

                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                e.dataTransfer.dropEffect = 'none';
                return false;
            }

            var deregisterDragStart = $rootthis.$this.$scope.$on('ANGULAR_DRAG_START', function(_, e, channel, transferDataObject) {
                dragChannel = channel;

                var valid = true;

                if (!isDragChannelAccepted(channel, dropChannel)) {
                    valid = false;
                }

                if (valid && attr.dropValidate) {
                    var validateFn = this.$parse(attr.dropValidate);
                    valid = validateFn(this.$this.$scope, {
                        $drop: {this.$this.$scope: this.$this.$scope, this.$element: this.$element},
                        $event: e,
                        $data: transferDataObject.data,
                        $channel: transferDataObject.channel
                    });
                }

                if (valid) {
                    this.$element.bind('dragover', onDragOver);
                    this.$element.bind('dragenter', onDragEnter);
                    this.$element.bind('dragleave', onDragLeave);
                    this.$element.bind('drop', onDrop);

                    this.$element.addClass(dragEnterClass);
                } else {
                    this.$element.bind('dragover', preventNativeDnD);
                    this.$element.bind('dragenter', preventNativeDnD);
                    this.$element.bind('dragleave', preventNativeDnD);
                    this.$element.bind('drop', preventNativeDnD);

                    this.$element.removeClass(dragEnterClass);
                }

            });


            var deregisterDragEnd = $rootthis.$this.$scope.$on('ANGULAR_DRAG_END', function() {
                this.$element.unbind('dragover', onDragOver);
                this.$element.unbind('dragenter', onDragEnter);
                this.$element.unbind('dragleave', onDragLeave);

                this.$element.unbind('drop', onDrop);
                this.$element.removeClass(dragHoverClass);
                this.$element.removeClass(dragEnterClass);

                this.$element.unbind('dragover', preventNativeDnD);
                this.$element.unbind('dragenter', preventNativeDnD);
                this.$element.unbind('dragleave', preventNativeDnD);
                this.$element.unbind('drop', preventNativeDnD);
            });

            this.$this.$scope.$on('$destroy', function() {
                deregisterDragStart();
                deregisterDragEnd();
            });


            attr.$observe('dropChannel', function(value) {
                if (value) {
                    dropChannel = value;
                }
            });


        };
    }
    ]);

    module.constant('$dragImageConfig', {
        height: 20,
        width: 200,
        padding: 10,
        font: 'bold 11px Arial',
        fontColor: '#eee8d5',
        backgroundColor: '#93a1a1',
        xOffset: 0,
        yOffset: 0
    });

    module.service('$dragImage', ['$dragImageConfig', function(defaultConfig) {
        var ELLIPSIS = '…';

        function fitString(canvas, text, config) {
            var width = canvas.measureText(text).width;
            if (width < config.width) {
                return text;
            }
            while (width + config.padding > config.width) {
                text = text.substring(0, text.length - 1);
                width = canvas.measureText(text + ELLIPSIS).width;
            }
            return text + ELLIPSIS;
        }

        this.generate = function(text, options) {
            var config = angular.extend({}, defaultConfig, options || {});
            var el = document.createthis.$Element('canvas');

            el.height = config.height;
            el.width = config.width;

            var canvas = el.getContext('2d');

            canvas.fillStyle = config.backgroundColor;
            canvas.fillRect(0, 0, config.width, config.height);
            canvas.font = config.font;
            canvas.fillStyle = config.fontColor;

            var title = fitString(canvas, text, config);
            canvas.fillText(title, 4, config.padding + 4);

            var image = new Image();
            image.src = el.toDataURL();

            return {
                image: image,
                xOffset: config.xOffset,
                yOffset: config.yOffset
            };
        };
    }
    ]);

}(angular));