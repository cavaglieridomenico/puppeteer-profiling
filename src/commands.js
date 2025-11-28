const COMMANDS = {
  // Tracing Control
  TRACE_START: '/trace:start',
  TRACE_STOP: '/trace:stop',

  // Navigation
  NAVIGATE_REFRESH: '/navigate:refresh',

  // Input Actions (Virtual Mirror / VMP)
  INPUT_TAP_VM_UPLOAD: '/input:tap-vm-upload',
  INPUT_TAP_VM_VIDEO: '/input:tap-vm-video',
  INPUT_TAP_VM_CONTINUE: '/input:tap-vm-vmp-continue',
  INPUT_TAP_VM_REC: '/input:tap-vm-vmp-rec',
  INPUT_TAP_MULTIVM_OPEN: '/input:tap-vm-multivm-open',
  INPUT_TAP_MULTIVM_CLOSE: '/input:tap-vm-multivm-close',
};

module.exports = { COMMANDS };
