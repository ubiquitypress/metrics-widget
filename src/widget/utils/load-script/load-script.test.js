import loadScript from './load-script';

test('inserts a new script tag into the DOM', () => {
  loadScript('myscript.js', () => {});
  expect(document.getElementById('myscript')).toBeInTheDocument();
});

test('duplicate script is not re-added if called twice', () => {
  loadScript('myscript.js', () => {});
  loadScript('myscript.js', () => {});
  expect(document.querySelectorAll('[id=myscript]').length).toBe(1);
});
