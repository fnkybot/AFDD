<script setup></script>

<template>
  <Head title="Dashboard" />

  <BasePageHeading
    title="Dashboard"
    :subtitle="`Welcome ${$page.props.auth.user.name.split(' ')[0]}, everything looks good!`"
  >
    <template #extra>
      <!-- <button type="button" class="btn btn-alt-primary" v-click-ripple>
        <i class="fa fa-plus opacity-50 me-1"></i>
        Main Action
      </button> -->
    </template>
  </BasePageHeading>

  <div class="content content-boxed">
        <BaseBlock
          title="Info"
          subtitle="Select action"
          :header-bg="false"
          bordered
        >
          <p>For now <span class="fw-semibold">AFDD</span> offers 3 modules supporting database design. To start designing your database you should start at <span class="fw-semibold">Draw ERD</span> module to make a entity relation diagram in Chen notation. After that you can <span class="fw-semibold">transform your diagram</span> to physical tables and after all <span class="fw-semibold">generate SQL code</span> to make your database real. Select one from below to test functionality.</p>
        </BaseBlock>
    <div class="row">

      <div class="col-sm-6 col-md-3">
        <BaseBlock tag="a" href="/app" bordered link-shadow>
          <template #content>
            <div
              class="block-content block-content-full border-bottom text-center"
            >
              <div class="py-3">
                <i class="si si-note fa-4x text-city"></i>
              </div>
            </div>
            <div
              class="block-content block-content-full d-flex align-items-center justify-content-between"
            >
              <span class="fw-semibold text-uppercase fs-sm">Draw ERD</span>
            </div>
          </template>
        </BaseBlock>
      </div>
      <div class="col-sm-6 col-md-3">
        <BaseBlock tag="a" href="/pdm" bordered link-shadow>
          <template #content>
            <div
              class="block-content block-content-full border-bottom text-center"
            >
              <div class="py-3">
                <i class="si si-rocket fa-4x text-flat"></i>
              </div>
            </div>
            <div
              class="block-content block-content-full d-flex align-items-center justify-content-between"
            >
              <span class="fw-semibold text-uppercase fs-sm">Transform to PDM</span>
            </div>
          </template>
        </BaseBlock>
      </div>
      <div class="col-sm-6 col-md-3">
        <BaseBlock tag="a" href="/sql" bordered link-shadow>
          <template #content>
            <div
              class="block-content block-content-full border-bottom text-center"
            >
              <div class="py-3">
                <i class="si si-wrench fa-4x text-smooth"></i>
              </div>
            </div>
            <div
              class="block-content block-content-full d-flex align-items-center justify-content-between"
            >
              <span class="fw-semibold text-uppercase fs-sm">Generate SQL</span>
            </div>
          </template>
        </BaseBlock>
      </div>
      <div class="col-sm-6 col-md-3">
        <BaseBlock tag="a" href="/profile" bordered link-shadow>
          <template #content>
            <div
              class="block-content block-content-full border-bottom text-center"
            >
              <div class="py-3">
                <i class="si si-user fa-4x text-amethyst"></i>
              </div>
            </div>
            <div
              class="block-content block-content-full d-flex align-items-center justify-content-between"
            >
              <span class="fw-semibold text-uppercase fs-sm">Manage Account</span>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>