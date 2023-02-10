async function main(){
	let scripts=[
		'https://unpkg.com/three@0.149.0/build/three.js'
	]
	let promises=include(...scripts)
	await Promise.all(promises)
	let canvas=draw(document.createElement('canvas'))[0]
	let renderer=new THREE.WebGLRenderer({ canvas })
	let{ width, height }=canvas.getBoundingClientRect()
	let aspect=width / height
	let fov=75
	let near=0.01
	let far=100.0
	let camera=new THREE.PerspectiveCamera(fov, aspect, near, far)
	/* Camera looking     Fov
		*     \ -z  /            \ -y
		*      \ | /              \ |
		* -x ----^---- +x    -z ----<---- +z
		*        |                / |
		*       +z               / +y
		*/
	camera.position.z += 2.0
	let scene=new THREE.Scene()
	let geometry=new THREE.BoxGeometry(1.0, 1.0, 1.0)
	let material=new THREE.MeshBasicMaterial({ color:'blue' })
	let mesh=new THREE.Mesh(geometry, material)
	mesh.position.x += 2.0
	scene.add(mesh)
	let meshes=[]
	material=new THREE.MeshPhongMaterial({ color:'blue' })
	geometry=cone_geometry()
	mesh=new THREE.Mesh(geometry, material)
	scene.add(mesh)
	meshes.push(mesh)
	let light=new THREE.DirectionalLight('white', 1.0)
	light.position.set(-1, 2, 4)
	scene.add(light)
	fullscreen_element(canvas)
	renderer.render(scene, camera)
	camera.aspect=aspect_element(renderer.domElement)
	camera.updateProjectionMatrix()
	let prev_time=0
	let elapsed_time=0
	let frame_limit=1.0/10
	let logs=draw(document.createElement('pre')).map(fullscreen_element).map(e => {
		e.style.color='white'
		let{ width, height }=canvas.getBoundingClientRect()
		let s=new THREE.Vector2()
		let{ x, y }=renderer.getSize(s)
		e.innerText=`canvas  ${width}x${height}\nrenderer ${x}x${y}\nframe-limit ${frame_limit}`.replace(/ /g, '\t')
		return draw(document.createElement('pre')).map(e2 => {
			e.append(e2)
			return e2
		})[0]
	})[0]
	frame()
	function frame(passed_ms=0){
		let time=passed_ms * 0.001 // convert to seconds
		let delta_time=time-prev_time
		prev_time=time
		elapsed_time += delta_time
		logs.innerText=`time ${time}\ndelta-time ${delta_time}\nelapsed-time ${elapsed_time}`
		if(elapsed_time >= frame_limit){
			elapsed_time=0
			meshes.map(mesh => {
				mesh.rotation.x = time
				mesh.rotation.y = time
				return mesh
			})
			renderer.render(scene, camera)
		}
		requestAnimationFrame(frame)
	}
}

function cone_geometry(){
	const radius = 1;  // ui: radius
	const height = Math.hypot(radius, 2*Math.PI*radius)
	const radialSegments = 16;  // ui: radialSegments
	const geometry = new THREE.ConeGeometry( radius, height, radialSegments );
	return geometry
}

// Returns aspect ratio of displayed node
function aspect_element(node){
	let{ width, height }=node.getBoundingClientRect()
	let aspect=width / height
	return aspect
}

// Returns received node, sets element to fit document's body
function fullscreen_element(node){
	document.body.style.height='100%'
	document.body.style.margin=0
	document.body.style.overflow='hidden'
	node.style.width=
		node.style.height='100%'
	node.style.display='block'
	node.style.position='absolute'
	node.style.left=
		node.style.top=0
	return node
}

// Returns array of received nodes
function draw(...nodes){
	document.body.append(...nodes)
	return nodes
}

// Returns script element, appends document script element in document's body
function draw_script(prefs={}){
	return draw(Object.assign(document.createElement('script'), prefs))[0]
}

// Returns array of promises, uses url as script source
function include(...urls){
	const async = true
	return urls.map(src => new Promise((onload, onerror) => draw_script({ src, async, onload, onerror })))
}
