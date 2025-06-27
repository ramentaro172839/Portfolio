document.addEventListener('DOMContentLoaded', function() {
    // tsParticles initialization for Dreamy Night theme
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#ff99cc", "#c792ea", "#9a9aff", "#89f7fe"]
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: { min: 1, max: 8 },
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.3,
                    sync: false
                }
            },
            links: {
                enable: false, // No lines connecting particles
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "bubble"
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 200,
                    size: 10,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                }
            }
        },
        detectRetina: true,
    });

    // Modal functionality
    var modal = document.getElementById('modal');
    var modalImg = document.getElementById('modal-img');
    var captionText = document.getElementById('caption');
    var galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.onclick = function(){
            if (modal && modalImg && captionText) {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            }
        }
    });

    var span = document.getElementsByClassName("close")[0];

    if (span) {
        span.onclick = function() { 
            if (modal) modal.style.display = "none";
        }
    }

    // Close modal when clicking outside the image
    window.onclick = function(event) {
        if (event.target == modal) {
            if (modal) modal.style.display = "none";
        }
    }

    // Smooth scroll for "作品を見る" button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});