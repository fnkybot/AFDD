<script setup>
import { useTemplateStore } from "@/stores/template";

// Main store
const store = useTemplateStore();
</script>

<template>
  <Head title="Database Design Application" />

  <div>
    <!-- Hero -->
    <div id="one-vue-hero" class="bg-body-extra-light">
      <div class="content content-full">
        <div class="row g-0 justify-content-center text-center">
          <div class="col-md-10 pt-7 pb-9">
            <div
              class="d-inline-flex align-items-center space-x-1 fs-sm badge bg-body text-dark mb-2 p-2"
            >
              <span>🔥</span>
              <span>Your tool for designing and managing database structures</span>
            </div>
            <h1 class="h1 fw-black mb-3">
              Simplifying Database Design and ERD Creation
            </h1>
            <p class="fs-5 fw-medium text-muted mb-4 mx-xl-8">
              Our application makes it easy to create and modify Entity Relationship Diagrams (ERD), visualize database structures, and streamline the database design process. Built with modern tools for developers and database architects.
            </p>
            <div>
                <Link
                href="/dashboard"
                class="btn btn-primary py-2 px-3 m-1"
                v-click-ripple
                >
                  <i class="fa fa-fw fa-desktop opacity-50 me-1"></i> Start Designing
                </Link>
                <Link
                href="/about"
                class="btn btn-secondary py-2 px-3 m-1"
                v-click-ripple
                >
                  About Project
                </Link>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero After -->
    <div id="one-vue-hero-after" class="bg-body-light">
      <div class="content content-full">
        <div class="px-lg-8 text-center">
          <BaseBlock
            fx-shadow
            class="overflow-hidden"
            content-class="p-2"
            style="margin-top: -200px"
          >
            <img
              class="img-fluid rounded-1"
              src="/assets/media/various/hero-promo.png"
              alt="Hero Promo Light Dashboard"
            />
          </BaseBlock>
        </div>
        <div class="row py-5">
          <div class="col-6 col-md-3">
            <div class="item item-rounded my-4 text-flat bg-flat-lighter">
              <i class="fa fa-fw fa-2x fa-database"></i>
            </div>
            <h4 class="mb-2">Database Design</h4>
            <p class="text-muted">
              Easily create, manage, and visualize database structures and relationships.
            </p>
          </div>
          <div class="col-6 col-md-3">
            <div class="item item-rounded my-4 text-success bg-success-light">
              <i class="fa fa-fw fa-2x fa-users"></i>
            </div>
            <h4 class="mb-2">Collaborative Work</h4>
            <p class="text-muted">
              Share and collaborate with your team on the design process in real-time.
            </p>
          </div>
          <div class="col-6 col-md-3">
            <div class="item item-rounded my-4 text-warning bg-warning-light">
              <i class="fa fa-fw fa-2x fa-cogs"></i>
            </div>
            <h4 class="mb-2">Auto-Generate SQL</h4>
            <p class="text-muted">
              Automatically generate SQL queries based on your ERD for easier database creation.
            </p>
          </div>
          <div class="col-6 col-md-3">
            <div class="item item-rounded my-4 text-primary bg-primary-light">
              <i class="fa fa-fw fa-2x fa-cloud"></i>
            </div>
            <h4 class="mb-2">Cloud Integration</h4>
            <p class="text-muted">
              Sync and store your designs in the cloud for access anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Call To Action -->
    <div id="one-vue-call-to-action" class="bg-body-extra-light">
      <div class="content content-full">
        <div class="pt-5">
          <div class="row mb-5">
            <div class="col-md-6">
              <h2 class="h1 fw-black mb-2">
                Crafted with
                <i class="fa fa-fw fa-heart text-city"></i> by
                <a class="link-fx" href="">fnky</a>
              </h2>

              <p class="fs-lg fw-medium text-muted mb-2 ">
                We used the best toolkits and libraries, built by passionate people, to recreate our database design application from scratch.
              </p>
              <div class="mb-0">
                <Link
                href="/dashboard"
                class="btn btn-primary py-2 px-3 m-1"
                v-click-ripple
                >
                  <i class="fa fa-fw fa-desktop opacity-50 me-1"></i> Start Designing
                </Link>
                <Link
                href="/about"
                class="btn btn-secondary py-2 px-3 m-1"
                v-click-ripple
                >
                  About Project
                </Link>
              </div>

            </div>
            <div
              class="col-md-6 d-none d-md-flex align-items-md-center justify-content-md-end"
            >
              <p class="h1 fw-bold text-body-bg-dark mb-0">Get Inspired.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
